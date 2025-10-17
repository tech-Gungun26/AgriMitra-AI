using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System;
using Dapper;
using System.Linq;

namespace AgriMitra_AI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<AuthController> _logger;

        public class LoginRequest
        {
            public string? Email { get; set; }
            public string? Password { get; set; }
        }

        public AuthController(IConfiguration config, ILogger<AuthController> logger)
        {
            _config = config;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { success = false, message = "Email and password are required" });
            }

            try
            {
                _logger.LogInformation("Login attempt for email: {Email}", request.Email);

                var connectionString = _config.GetConnectionString("DefaultConnection");
                if (string.IsNullOrEmpty(connectionString))
                {
                    _logger.LogError("Connection string 'DefaultConnection' not found");
                    return StatusCode(500, new { success = false, message = "Database configuration error" });
                }

                using (var connection = new SqlConnection(connectionString))
                {
                    try
                    {
                        await connection.OpenAsync();
                        _logger.LogInformation("Database connection opened successfully");

                        var query = "SELECT id, name, email, password, role FROM users WHERE email = @Email";
                        var user = await connection.QueryFirstOrDefaultAsync<dynamic>(query, new { Email = request.Email });

                        if (user == null)
                        {
                            _logger.LogWarning("Login failed: User not found for email: {Email}", request.Email);
                            return BadRequest(new { success = false, message = "User not found" });
                        }

                        // In production, use proper password hashing (BCrypt, Argon2, etc.)
                        if (user.password != request.Password)
                        {
                            _logger.LogWarning("Login failed: Invalid password for email: {Email}", request.Email);
                            return BadRequest(new { success = false, message = "Invalid password" });
                        }

                        var token = GenerateJwtToken(user);
                        _logger.LogInformation("Login successful for user: {Email}", request.Email);

                        return Ok(new
                        {
                            success = true,
                            data = new {
                                token = token,
                                user = new
                                {
                                    id = user.id,
                                    name = user.name,
                                    email = user.email,
                                    role = user.role
                                }
                            },
                            message = "Login successful"
                        });
                    }
                    catch (SqlException sqlEx)
                    {
                        _logger.LogError(sqlEx, "SQL Error during login: {Message}", sqlEx.Message);
                        return StatusCode(500, new { success = false, message = "Database error", error = sqlEx.Message });
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during login: {Message}", ex.Message);
                return StatusCode(500, new { success = false, message = "Internal server error", error = ex.Message });
            }
        }

        private string GenerateJwtToken(dynamic user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? "your-256-bit-secret"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.email),
                new Claim("name", user.name),
                new Claim("role", user.role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // For testing purposes
        if (request.Email == "test@example.com" && request.Password == "password123")
        {
            return Ok(new
            {
                token = "test-jwt-token",
                user = new
                {
                    id = 1,
                    name = "Test User",
                    email = request.Email,
                    role = "User"
                }
            });
        }

        if (request.Email == "admin@agrimitra.ai" && request.Password == "Admin@123")
        {
            return Ok(new
            {
                token = "admin-jwt-token",
                user = new
                {
                    id = 2,
                    name = "Admin User",
                    email = request.Email,
                    role = "Admin"
                }
            });
        }

        return Unauthorized(new { message = "Invalid email or password" });
    }
}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
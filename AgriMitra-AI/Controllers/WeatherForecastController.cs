using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public WeatherController(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    [HttpGet("{city}")]
    public async Task<IActionResult> GetWeather(string city)
    {
        try
        {
            var apiKey = _config["OpenWeather:ApiKey"]; // store safely in appsettings.json
            var url = $"http://api.openweathermap.org/data/2.5/weather?q={city},IN&appid={apiKey}&units=metric&lang=hi";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
        catch
        {
            return StatusCode(500, new { error = "Unable to fetch weather data." });
        }
    }
}

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpClient();

// CORS - allow local dev origins (adjust for production)
builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalDevPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:19006", "http://localhost:19000", "http://localhost:19002", "http://localhost:19001", "http://localhost:19007", "http://localhost:19008", "http://localhost:3000", "http://localhost:8081", "http://localhost:19006")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // During development avoid automatic HTTP->HTTPS redirect so local HTTP
    // ports (easier for Expo/web) remain reachable without cert issues.
}

// Only enable HTTPS redirection in non-development environments
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("LocalDevPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

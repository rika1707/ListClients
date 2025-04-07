using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OVEmpleadores.Persistencia.Repositorios;
using APIClients.Services.Maps;
using APIClients.Repository.IRepository;
using APIClients.Repository;
using APIClients.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//create variable for the connection string
var conectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//Registrar servicio para la conexion
builder.Services.AddDbContext<ClientContext>(options => options.UseSqlServer(conectionString));

//Register mapper
builder.Services.AddAutoMapper(typeof(ClientsMap));


//Define cors policies
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin() //allow any origin
            .AllowAnyMethod() // allow any method
            .AllowAnyHeader(); // allow any header
        });
});

builder.Services.AddScoped<IClientsRepository, ClientsRepository>();
builder.Services.AddScoped<ClientsService>();
builder.Services.AddScoped<ExcelService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "APIClients", Version = "v1" });

    // Esta línea asegura que se use el esquema OpenAPI 3.x
    c.EnableAnnotations(); // opcional, para anotaciones si usas [SwaggerOperation] y demás
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.Run();

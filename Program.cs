using MenuDigital.Data;
using MenuDigital.Repositorio;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configuração do Entity Framework Core
builder.Services.AddDbContext<ProdutoBancoContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

// Configuração do Entity Framework Core
builder.Services.AddDbContext<SubBancoContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));


// Configuração do Entity Framework Core
builder.Services.AddDbContext<BancoContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

// Configuração do Entity Framework Core
builder.Services.AddDbContext<LoginContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

builder.Services.AddScoped<ICategoriaRepositorio, CategoriaRepositorio>();

builder.Services.AddScoped<ISubCategoriaRepositorio, SubCategoriaRepositorio>();

builder.Services.AddScoped<IProdutoRepositorio, ProdutoRepositorio>();

builder.Services.AddScoped<ILoginRepositorio, LoginRepositorio>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

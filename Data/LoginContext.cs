using MenuDigital.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MenuDigital.Data
{
	public class LoginContext : DbContext
	{
		public LoginContext(DbContextOptions<LoginContext> options) : base(options)
		{
		}

		public DbSet<UsuarioCliente> CLIENTES { get; set; }
	}
}

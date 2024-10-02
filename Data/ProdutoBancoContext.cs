using MenuDigital.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MenuDigital.Data
{
	public class ProdutoBancoContext : DbContext
	{
		public ProdutoBancoContext(DbContextOptions<ProdutoBancoContext> options) : base(options)
		{
		}

		public DbSet<ProdutoModel> PRODUTO { get; set; }
	}
}

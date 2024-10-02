using MenuDigital.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MenuDigital.Data
{
	public class SubBancoContext : DbContext
	{
		public SubBancoContext(DbContextOptions<SubBancoContext> options) : base(options)
		{
		}

		public DbSet<SubCategoriaModel> SUB_CATEGORIA { get; set; }
	}
}

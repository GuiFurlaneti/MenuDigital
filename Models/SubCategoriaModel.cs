using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MenuDigital.Models
{
	#pragma warning disable CS8618
	public class SubCategoriaModel
	{
		public int ID { get; set; }
		public string NOME_CATEGORIA { get; set; }
		public string NOME_SUB_CATEGORIA { get; set; }
	}
}

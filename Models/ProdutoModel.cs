using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace MenuDigital.Models
{
	#pragma warning disable CS8618
	public class ProdutoModel
	{
		public int ID { get; set; }
		public byte[] IMG_PRODUTO { get; set; }
		public string NOME_PRODUTO { get; set; }
		public string PRECO_PRODUTO { get; set; }
		public string DESC_PRODUTO { get; set; }
		public string CATEGORIA_PRODUTO { get; set; }
		public string SUB_CATEGORIA_PRODUTO { get; set; }
	}
}

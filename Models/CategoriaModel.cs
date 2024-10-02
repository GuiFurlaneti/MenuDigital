using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MenuDigital.Models
{
	#pragma warning disable CS8618
	public class CategoriaModel
	{
		public int ID { get; set; }
		public byte[] IMG_CATEGORIA { get; set; }
		public string NOME_CATEGORIA { get; set; }

	}
}

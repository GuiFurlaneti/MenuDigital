using MenuDigital.Data;
using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public class SubCategoriaRepositorio : ISubCategoriaRepositorio
	{
		private readonly SubBancoContext _bancoContextSub;
		public SubCategoriaRepositorio(SubBancoContext bancoContextSub)
		{
			_bancoContextSub = bancoContextSub;
		}

		public SubCategoriaModel AdicionarSubCategoria(SubCategoriaModel subcategoria)
		{
			_bancoContextSub.Add(subcategoria);
			_bancoContextSub.SaveChanges();
			return subcategoria;
		}

		public List<SubCategoriaModel> ListarSubCategorias(string cat)
		{
			return _bancoContextSub.SUB_CATEGORIA
					  .Where(sc => sc.NOME_CATEGORIA == cat)
					  .ToList();
		}

		public List<SubCategoriaModel> ListarSubCategoriasQtd()
		{
			return _bancoContextSub.SUB_CATEGORIA.ToList();
		}

		public SubCategoriaModel BuscarSubCategorias(int ID)
		{
			#pragma warning disable CS8603
			return _bancoContextSub.SUB_CATEGORIA.FirstOrDefault(x => x.ID == ID);

		}

		public SubCategoriaModel ExcluirItemSubCategoria(int ID)
		{
			SubCategoriaModel subcategoriaDB = BuscarSubCategorias(ID);
			if (subcategoriaDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do produto");

			_bancoContextSub.Remove(subcategoriaDB);
			_bancoContextSub.SaveChanges();
			return subcategoriaDB;
		}

		public List<SubCategoriaModel> ExcluirTodosSubCategoria(string subCategoria)
		{
			var subCategorias = _bancoContextSub.SUB_CATEGORIA
				.Where(sc => sc.NOME_CATEGORIA == subCategoria)
				.ToList();

			if (subCategorias.Any())
			{
				_bancoContextSub.SUB_CATEGORIA.RemoveRange(subCategorias);
				_bancoContextSub.SaveChanges();
			}

			return subCategorias;
		}

	}
}

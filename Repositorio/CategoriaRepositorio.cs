using MenuDigital.Data;
using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public class CategoriaRepositorio : ICategoriaRepositorio
	{
		private readonly BancoContext _bancoContext;
		public CategoriaRepositorio(BancoContext bancoContext)
		{
			_bancoContext = bancoContext;
		}


		public CategoriaModel Adicionar(CategoriaModel categoria)
		{
			_bancoContext.Add(categoria);
			_bancoContext.SaveChanges();
			return categoria;
		}

		public List<CategoriaModel> ListarCategorias()
		{
			return _bancoContext.CATEGORIA.ToList();
		}

		public List<CategoriaModel> ListarCategoriasId(int id)
		{
			return _bancoContext.CATEGORIA
								.Where(c => c.ID == id)
								.ToList();
		}

		public CategoriaModel BuscarCategorias(int ID)
		{
			#pragma warning disable CS8603
			return _bancoContext.CATEGORIA.FirstOrDefault(x => x.ID == ID);

		}



		public CategoriaModel ExcluirItemCategoria(int ID, string NOME)
		{
			CategoriaModel categoriaDB = BuscarCategorias(ID);
			if (categoriaDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do produto");

			_bancoContext.Remove(categoriaDB);
			_bancoContext.SaveChanges();
			return categoriaDB;
		}
	}
}

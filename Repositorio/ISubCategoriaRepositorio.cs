using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public interface ISubCategoriaRepositorio
	{
		SubCategoriaModel AdicionarSubCategoria(SubCategoriaModel subcategoria);
		List<SubCategoriaModel> ListarSubCategorias(string cat);

		List<SubCategoriaModel> ListarSubCategoriasQtd();

		SubCategoriaModel ExcluirItemSubCategoria(int ID);

		//SubCategoriaModel ExcluirTodosSubCategoria(string subCategoria);

		List<SubCategoriaModel> ExcluirTodosSubCategoria(string subCategoria);
	}
}

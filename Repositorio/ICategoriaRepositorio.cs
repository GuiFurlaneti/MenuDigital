using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public interface ICategoriaRepositorio
	{
		CategoriaModel Adicionar(CategoriaModel categoria);
		List<CategoriaModel> ListarCategorias();
		List<CategoriaModel> ListarCategoriasId(int id);
		CategoriaModel ExcluirItemCategoria(int ID, string NOME);
	}
}

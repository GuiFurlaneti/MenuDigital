using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public interface IProdutoRepositorio
	{
		ProdutoModel AdicionarProduto(ProdutoModel produto);
		List<ProdutoModel> ListarProdutos(string subCat);
		List<ProdutoModel> ListarProdutosAdm(string cat, string subCat);
		List<ProdutoModel> listarProdutoQTD();
		ProdutoModel BuscarAprovados(int id);
		ProdutoModel AlterarProdutos(ProdutoModel produto);
		ProdutoModel ExcluirProdutos(int id);

		List<ProdutoModel> SearchInputProduto(string valueInput);

	}
}

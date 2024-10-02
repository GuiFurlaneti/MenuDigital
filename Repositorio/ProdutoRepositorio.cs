using MenuDigital.Data;
using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public class ProdutoRepositorio : IProdutoRepositorio
	{
		private readonly ProdutoBancoContext _produtobancoContext;
		public ProdutoRepositorio(ProdutoBancoContext produtobancoContext)
		{
			_produtobancoContext = produtobancoContext;
		}


		public ProdutoModel AdicionarProduto(ProdutoModel produto)
		{
			_produtobancoContext.Add(produto);
			_produtobancoContext.SaveChanges();
			return produto;
		}

		public List<ProdutoModel> ListarProdutos(string subCat)
		{
			return _produtobancoContext.PRODUTO
					  .Where(sc => sc.SUB_CATEGORIA_PRODUTO == subCat)
					  .ToList();
		}

		public List<ProdutoModel> ListarProdutosAdmoo(string cat, string subCat)
		{
			return _produtobancoContext.PRODUTO
					  .Where(p => p.CATEGORIA_PRODUTO == cat && p.SUB_CATEGORIA_PRODUTO == subCat)
					  .ToList();
		}

		public List<ProdutoModel> ListarProdutosAdm(string cat, string subCat)
		{
			return _produtobancoContext.PRODUTO
				.Where(p => (cat == "all" || p.CATEGORIA_PRODUTO == cat) &&
							(subCat == "all" || p.SUB_CATEGORIA_PRODUTO == subCat))
				.ToList();
		}

		public List<ProdutoModel> listarProdutoQTD()
		{
			return _produtobancoContext.PRODUTO.ToList();
		}


		public ProdutoModel BuscarAprovados(int id)
		{
			#pragma warning disable CS8603
			return _produtobancoContext.PRODUTO.FirstOrDefault(x => x.ID == id);

		}

		public ProdutoModel AlterarProdutos(ProdutoModel produto)
		{
			ProdutoModel produtoDB = BuscarAprovados(produto.ID);
			if (produtoDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do produto");

			produtoDB.IMG_PRODUTO = produto.IMG_PRODUTO;
			produtoDB.NOME_PRODUTO = produto.NOME_PRODUTO;
			produtoDB.PRECO_PRODUTO = produto.PRECO_PRODUTO;
			produtoDB.DESC_PRODUTO = produto.DESC_PRODUTO;
			produtoDB.CATEGORIA_PRODUTO = produto.CATEGORIA_PRODUTO;
			produtoDB.SUB_CATEGORIA_PRODUTO = produto.SUB_CATEGORIA_PRODUTO;

			_produtobancoContext.Update(produtoDB);
			_produtobancoContext.SaveChanges();

			return produtoDB;
		}

		public ProdutoModel ExcluirProdutos(int id)
		{
			ProdutoModel produtoDB = BuscarAprovados(id);
			if (produtoDB == null) throw new System.Exception("Houve um erro ao atulizar as informações do produto");

			_produtobancoContext.Remove(produtoDB);
			_produtobancoContext.SaveChanges();
			return produtoDB;
		}

		public List<ProdutoModel> SearchInputProduto(string valueInput)
		{
			return _produtobancoContext.PRODUTO
					  .Where(sc => sc.NOME_PRODUTO.Contains(valueInput))
					  .ToList();
		}
	}
}

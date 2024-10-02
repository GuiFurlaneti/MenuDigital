using MenuDigital.Models;
using MenuDigital.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace MenuDigital.Controllers
{
	public class HomeController : Controller
	{
		private readonly ICategoriaRepositorio _categoriaRepositorio;
		private readonly ISubCategoriaRepositorio _subcategoriaRepositorio;
		private readonly IProdutoRepositorio _produtoRepositorio;
		public HomeController(ICategoriaRepositorio categoriaRepositorio, ISubCategoriaRepositorio subcategoriaRepositorio, IProdutoRepositorio produtoRepositorio)
		{
			_categoriaRepositorio = categoriaRepositorio;
			_subcategoriaRepositorio = subcategoriaRepositorio;
			_produtoRepositorio = produtoRepositorio;

		}

		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}

		// ------------------------------------------------------------------------------------------------------ //

		public IActionResult AdicionarCategoria(CategoriaModel categoria)
		{
			_categoriaRepositorio.Adicionar(categoria);
			return new JsonResult(categoria);
		}

		public IActionResult ListarCategorias()
		{
			List<CategoriaModel> categoria = _categoriaRepositorio.ListarCategorias();
			return new JsonResult(categoria);
		}

		public IActionResult AdicionarSubCategoria(SubCategoriaModel subcategoria)
		{
			_subcategoriaRepositorio.AdicionarSubCategoria(subcategoria);
			return new JsonResult(subcategoria);
		}

		public IActionResult ListarSubCategorias(string cat)
		{
			List<SubCategoriaModel> subcategoria = _subcategoriaRepositorio.ListarSubCategorias(cat);
			return new JsonResult(subcategoria);
		}

		public IActionResult AdicionarProduto(ProdutoModel produto)
		{
			_produtoRepositorio.AdicionarProduto(produto);
			return new JsonResult(produto);
		}

		public IActionResult ListarProdutos(string subCat)
		{
			List<ProdutoModel> produto = _produtoRepositorio.ListarProdutos(subCat);
			return new JsonResult(produto);
		}

		public IActionResult ListarProdutosAdm(string cat, string subCat)
		{
			List<ProdutoModel> produto = _produtoRepositorio.ListarProdutosAdm(cat, subCat);
			return new JsonResult(produto);
		}

		public IActionResult ListarSubCategoriasQtd()
		{
			List<SubCategoriaModel> subcategoria = _subcategoriaRepositorio.ListarSubCategoriasQtd();
			return new JsonResult(subcategoria);
		}

		public IActionResult listarProdutoQTD()
		{
			List<ProdutoModel> produto = _produtoRepositorio.listarProdutoQTD();
			return new JsonResult(produto);
		}

		public IActionResult AlterarProdutos(ProdutoModel produto)
		{
			_produtoRepositorio.AlterarProdutos(produto);
			return RedirectToAction("Index");
		}

		public IActionResult ExcluirrProdutos(int id)
		{
			_produtoRepositorio.ExcluirProdutos(id);
			var result = new
			{
				Success = true,
				Message = "Excluido com sucesso",
				Codigo = "0"
			};
			return Json(result);
		}

		public IActionResult ListarCategoriasId(int id)
		{
			List<CategoriaModel> categoria = _categoriaRepositorio.ListarCategoriasId(id);
			return new JsonResult(categoria);
		}

		public IActionResult ExcluirItemCategoria(int ID, string NOME)
		{
			_categoriaRepositorio.ExcluirItemCategoria(ID, NOME);
			var result = new
			{
				Success = true,
				Message = "Excluido com sucesso",
				Codigo = "0"
			};
			return Json(result);
		}

		public IActionResult ExcluirItemSubCategoria(int ID)
		{
			_subcategoriaRepositorio.ExcluirItemSubCategoria(ID);
			var result = new
			{
				Success = true,
				Message = "Excluido com sucesso",
				Codigo = "0"
			};
			return Json(result);
		}

		public IActionResult ExcluirTodosSubCategoria(string subCategoria)
		{
			_subcategoriaRepositorio.ExcluirTodosSubCategoria(subCategoria);
			var result = new
			{
				Success = true,
				Message = "Excluido com sucesso",
				Codigo = "0"
			};
			return Json(result);
		}

		public IActionResult SearchInputProduto(string valueInput)
		{
			List<ProdutoModel> produto = _produtoRepositorio.SearchInputProduto(valueInput);
			return new JsonResult(produto);
		}

	}
}
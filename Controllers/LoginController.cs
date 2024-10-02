using MenuDigital.Models;
using MenuDigital.Repositorio;
using Microsoft.AspNetCore.Mvc;

namespace MenuDigital.Controllers
{
	public class LoginController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		private readonly ILoginRepositorio _loginRepositorio;
		public LoginController(ILoginRepositorio loginRepositorio)
		{
			_loginRepositorio = loginRepositorio;

		}

		public IActionResult ValidarLoginAutenticado(string user, string psw)
		{
			UsuarioCliente loginUsuario = _loginRepositorio.ValidarLoginAutenticado(user, psw);

			if (loginUsuario == null)
			{
				var result = new
				{
					Success = false,
					Message = "ACESSO NEGADO",
					Codigo = "0"
				};
				return Json(result);
			}

			else
			{
				var userBda = loginUsuario.USUARIO;
				var pswBda = loginUsuario.SENHA;
				if (user == userBda)
				{
					if (psw == pswBda)
					{
						var result = new
						{
							Success = true,
							Message = "ACESSO PERMITIDO",
							Codigo = "0"
						};
						return Json(result);
					}
					else
					{
						var result = new
						{
							Success = false,
							Message = "ACESSO NEGADO",
							Codigo = "0"
						};
						return Json(result);
					}
				}
				else
				{
					var result = new
					{
						Success = false,
						Message = "ACESSO NEGADO",
						Codigo = "0"
					};
					return Json(result);
				}
			}

		}
	}
}

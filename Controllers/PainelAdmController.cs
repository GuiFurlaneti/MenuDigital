using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;

namespace MenuDigital.Controllers
{
	public class PainelAdmController : Controller
	{
		public IActionResult Index(string validate)
		{
			if (validate == "true")
			{

				return View();
			}
			else
			{
				var result = new
				{
					Success = false,
					Message = "NÃO PERMITIDO",
					Codigo = "404"
				};
				return View("~/Views/Login/Index.cshtml");
			}
		}
	}
}

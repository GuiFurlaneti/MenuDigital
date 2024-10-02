using MenuDigital.Data;
using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public class LoginRepositorio : ILoginRepositorio
	{
		private readonly LoginContext _loginContext;
		public LoginRepositorio(LoginContext loginContext)
		{
			_loginContext = loginContext;
		}

		public UsuarioCliente ValidarLoginAutenticado(string user, string psw)
		{
			#pragma warning disable CS8603
			return _loginContext.CLIENTES.FirstOrDefault(x => x.USUARIO == user);

		}
	}
}

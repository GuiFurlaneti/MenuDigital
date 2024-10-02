using MenuDigital.Models;

namespace MenuDigital.Repositorio
{
	public interface ILoginRepositorio
	{
		UsuarioCliente ValidarLoginAutenticado(string user, string psw);
	}
}

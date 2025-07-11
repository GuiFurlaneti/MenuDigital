-----------------------------------------------------------------------------------------
Menu Digital - Web App
-----------------------------------------------------------------------------------------

O Menu Digital é um aplicativo web desenvolvido em .NET C# com o propósito de exibir produtos em um menu digital. Ele é dividido em duas telas principais:

-----------------------------------------------------------------------------------------
Tela do Cliente:
-----------------------------------------------------------------------------------------
Apresenta os produtos com fotos, nomes, preços e descrições. Também inclui uma barra de pesquisa para encontrar produtos específicos.

-----------------------------------------------------------------------------------------
Painel Administrativo:
-----------------------------------------------------------------------------------------
Onde o administrador (dono do Menu Digital) pode gerenciar produtos e categorias/subcategorias através de operações CRUD (Criar, Ler, Atualizar, Deletar). 
O painel administrativo também oferece uma funcionalidade para clonar produtos, adicionando automaticamente um sufixo - Cópia (01) ao nome do produto clonado. Todos os dados 
são obrigatórios, e há validações para garantir que as informações estejam completas.

O projeto é totalmente responsivo e funciona em qualquer dispositivo.

-----------------------------------------------------------------------------------------
Funcionalidades
-----------------------------------------------------------------------------------------
Tela do Cliente:
- Visualização de produtos com fotos, nome, preço e descrição.
- Pesquisa de produtos por nome.
- Exibição de produtos por categorias e subcategorias.
  
![image](https://github.com/user-attachments/assets/a25c3e7a-0485-4042-98e1-39d0537edac9)


Painel Administrativo:
- CRUD de Produtos: Cadastrar, editar, visualizar e deletar produtos.
- CRUD de Categorias/Subcategorias: Gerenciar categorias e subcategorias.
- Validação de campos obrigatórios.
- Funcionalidade de clonar produtos (adicionando sufixo no nome).
  
![image](https://github.com/user-attachments/assets/0f873234-a3c8-4741-9bce-fd61cbff4cb7)

  
Outras Características
- Responsividade: Totalmente adaptado para funcionar em qualquer dispositivo (desktop, tablet, celular).



-----------------------------------------------------------------------------------------
Tecnologias Utilizadas
-----------------------------------------------------------------------------------------
Back-End:
- .NET C#
- JavaScript
- jQuery
- Ajax
- Entity Framework Core

Front-End:
- HTML
- CSS
- Bootstrap
- JavaScript

Banco de Dados:
- SQL Server (usando SQL Management Studio)


-----------------------------------------------------------------------------------------
Requisitos para Executar o Projeto
-----------------------------------------------------------------------------------------
Certifique-se de ter as seguintes dependências instaladas para executar o projeto corretamente:

Pacotes NuGet
- Microsoft.EntityFrameworkCore versão 7.0.0
- Microsoft.EntityFrameworkCore.Design versão 7.0.0
- Microsoft.EntityFrameworkCore.SqlServer versão 7.0.0
- Microsoft.EntityFrameworkCore.Tools versão 7.0.0
- Você pode instalar esses pacotes usando o Gerenciador de Pacotes NuGet no Visual Studio ou pelo Console do Gerenciador de Pacotes com os seguintes comandos:

bash
- Install-Package Microsoft.EntityFrameworkCore -Version 7.0.0
- Install-Package Microsoft.EntityFrameworkCore.Design -Version 7.0.0
- Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 7.0.0
- Install-Package Microsoft.EntityFrameworkCore.Tools -Version 7.0.0

Outros Requisitos
- SQL Server instalado e configurado.
- Visual Studio com suporte para projetos .NET Core.

-----------------------------------------------------------------------------------------
Como Rodar o Projeto
-----------------------------------------------------------------------------------------

Clone este repositório:
- git clone https://github.com/LeandroSampaio7/MenuDigital.git
- Abra o projeto no Visual Studio.
- Restaure os pacotes NuGet necessarios
- Execute o projeto pressionando F5 ou usando o comando:


-----------------------------------------------------------------------------------------
Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.
-----------------------------------------------------------------------------------------


-----------------------------------------------------------------------------------------
## 👨‍💻 Sobre minha participação

Colaborei como desenvolvedor júnior no layout do painel administrativo, nas validações de formulário e na parte visual da tela do cliente.

-----------------------------------------------------------------------------------------
Outras Telas
-----------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------
Pesquisar um Produto
-----------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/824ed368-0e34-4d0e-b197-89adce7a2088)

-----------------------------------------------------------------------------------------
Outros Produtos
-----------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/c15a9123-b9b2-49b7-a267-ab04c8ea3f15)

-----------------------------------------------------------------------------------------
Login para acessar o Painel Administrativo
-----------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/b04f31ad-80ff-46f9-9392-20097c0702dc)

-----------------------------------------------------------------------------------------
Incluir uma Categoria
-----------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/2fe622f2-6405-4c53-8de8-bc298c0193ee)

-----------------------------------------------------------------------------------------
Incluir uma Sub-Categoria
-----------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/9b197181-9d1b-4310-83de-d6320476d236)







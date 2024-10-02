$(document).ready(function () {

    $('.containerExibeProduto').hide();
    $('.containerExcluirProduto').hide();
    $('.ct-loading-modalEdit').hide();
    $('.infoForm').show();

    $('.formPainelIncluir').hide();
    $('.formPainelAtualizar').hide();
    $('.containerTelaSearch').hide();

    listarCategorias();

    //listarCategoriasIncluirSub();
    //listarCategoriasIncluirProd();


    listarCategoriasIncluirAdmModal();
    listarCategoriasIncluirAdmList();
    listarProdutoQTD();

    listarCategoriasAtualizarAdmModal();


    $(".msg_retorno").hide();
    $(".msg_retorno_login").hide();

    listarProdutosListAdm("allList");

    listarCategoriasQTD();
    listarSubCategoriasQTD();

    var larguraTela = $(window).width();
    if (larguraTela === 999) {
        fecharModalEditResp();
    }

    $('.excCategoria-ct').hide();
    $('.containerCrudCategoria').hide();
    $('.containerSubCrudCategoria').hide();
    $('.excSubCategoria-ct').hide();

    setTimeout(function () {
        var catPadraoI = $('#categoriasAdmListModal').val();
        var catPadraoA = $('#categoriaAtualizarProduto').val();

        listarSubCategoriasIncluirAdmModal(catPadraoI);
        listarSubCategoriasAtualizarAdmModal(catPadraoA)
    }, 4000);



    //listarProdutos('Essências');
    //listarSubCategorias('Narguilés');


});

// -- QUANTIDADE DE CATEGORIAS ATUALIZADAS -- //
function listarCategoriasQTD() {
    $.ajax({
        url: '/Home/ListarCategorias',
        type: 'POST',
        data: {},
        success: function (response) {
            var categorias = response;
            var contadorCatergoria = 0;
            if (categorias.length > 0) {
                for (var i = 0; i < categorias.length; i++) {
                    contadorCatergoria = contadorCatergoria + 1
                }
                $('#number_qtd_categoria').text(contadorCatergoria);
            } else {
                $('#number_qtd_categoria').text('0');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarSubCategoriasQTD() {
    $.ajax({
        url: '/Home/ListarSubCategoriasQtd',
        type: 'POST',
        data: {},
        success: function (response) {
            var categorias = response;
            var contadorCatergoria = 0;
            if (categorias.length > 0) {
                for (var i = 0; i < categorias.length; i++) {
                    contadorCatergoria = contadorCatergoria + 1
                }
                $('#number_qtd_sub_categoria').text(contadorCatergoria);
            } else {
                $('#number_qtd_sub_categoria').text('0');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarProdutoQTD() {
    $.ajax({
        url: '/Home/listarProdutoQTD',
        type: 'POST',
        data: {},
        success: function (response) {
            var produtos = response;
            var contadorProduto = 0;

            if (produtos.length > 0) {
                for (var i = 0; i < produtos.length; i++) {
                    contadorProduto = contadorProduto + 1
                }
                $('#number_qtd_produtos').text(contadorProduto);
            } else {
                $('#number_qtd_produtos').text('0');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function atualizaListModalEadm() {
    listarCategoriasIncluirAdmModal();
    listarCategoriasIncluirAdmList();
    setTimeout(function () {
        var catPadraoI = $('#categoriasAdmListModal').val();
        var catPadraoA = $('#categoriaAtualizarProduto').val();
        listarSubCategoriasIncluirAdmModal(catPadraoI);
        listarSubCategoriasAtualizarAdmModal(catPadraoA)
    }, 4000);
}
// -- ----------------------------------- -- //



function fechaModalProduto() {
    $('.containerExibeProduto').hide();
    $('body').css('overflow', 'auto');
}

function fechaModalExcluirProduto() {

    $('.imgExcluirModal img').attr('src', "");
    $('#nomeExcluirModal').text("");
    $('#idExcluirModal').val("");

    $('.containerExcluirProduto').hide();
    $('body').css('overflow', 'auto');
}

function abreModalProduto(img, nome, preco, desc) {

    function sanitizeText(text) {
        return text.replace(/<br\s*\/?>/gi, '\n');
    }

    desc = sanitizeText(desc);

    img = 'data:image/png;base64,' + img;

    $('.ctExibeProduto-img img').attr('src', img);
    $('.title').text(nome);
    $('.preco').text(preco);
    $('.descProd p').text(desc);

    $('body').css('overflow', 'hidden');

    $('.containerExibeProduto').fadeIn('slow');

    //$('html, body').animate({
    //     scrollTop: $('#modalDetalhesPrduto').offset().top
    //}, 500);

    $('#modalDetalhesPrduto').focus();


}

function abreModalExcluirProduto(id, nome, img) {


    $('.imgExcluirModal img').attr('src', "");
    $('#nomeExcluirModal').text("");
    $('#idExcluirModal').val("");


    img = 'data:image/png;base64,' + img;

    $('.imgExcluirModal img').attr('src', img);
    $('#nomeExcluirModal').text(nome);
    $('#idExcluirModal').val(id);

    $('body').css('overflow', 'hidden');

    $('.containerExcluirProduto').fadeIn('slow');

    $('.containerExcluirProduto').focus();


}

function exibiLoading() {
    $('.itens-categorias').css('justify-content', 'center');
    $('.item-cat').hide();
    $('.ct-loading-cat').show();
}

function ocultaLoading() {
    $('.itens-categorias').css('justify-content', 'left');
    $('.ct-loading-cat').hide();
    $('.item-cat').show();
}

function removerClasseActiveCategorias() {
    $('.item-cat.active').removeClass('active');
}

function removerClasseActiveSubCategorias() {
    $('.item-sub.active').removeClass('active');
}

function incluirCategoria() {

    var nome = $('#nomeIncluirCategoria').val();
    var arqImg = document.getElementById('artImgIncluirCat');
    var img = arqImg.files[0];

    if (validaIncluirCategoria()) {
        if (img) {
            convertToBase64(img)
                .then(base64String => {
                    $.ajax({
                        url: '/Home/AdicionarCategoria',
                        type: 'POST',
                        data: {
                            IMG_CATEGORIA: base64String,
                            NOME_CATEGORIA: nome
                        },
                        success: function (response) {
                            console.log('Sucesso');
                            fechaModalIncluirCategoria();
                            exibeMsgRetorno("Categoria incluida com sucesso!", "sucesso");
                            listarCategoriasQTD();
                            atualizaListModalEadm();
                        },
                        error: function (xhr, status, error) {
                            console.error('Erro na requisição AJAX:', error);
                        }
                    });
                })
                .catch(error => {
                    console.error('Erro ao converter a imagem para Base64:', error);
                });
        } else {
            console.error('Nenhuma imagem foi selecionada.');
        }
    }


}

function validaIncluirCategoria() {

    var nome = $('#nomeIncluirCategoria').val();
    var arqImg = document.getElementById('artImgIncluirCat');
    var img = arqImg.files[0];

    //ARQUIVO
    if (arqImg == null || arqImg == "" || arqImg == undefined) {
        exibeMsgRetorno("Arquivo de imagem invalido!");
        return false;
    }

    //IMAGEM
    if (img == null || img == "" || img == undefined) {
        exibeMsgRetorno("Imagem é obrigatório!");
        return false;
    }

    //TITULO
    if (nome == null || nome == "") {
        $('#nomeIncluirCategoria').focus();
        exibeMsgRetorno("Nome da categoria é obrigatório!");
        return false;
    }

    return true;

}

function listarCategorias() {
    exibiLoading();
    $.ajax({
        url: '/Home/ListarCategorias',
        type: 'POST',
        data: {},
        success: function (response) {


            var categoriasCt = $('.itens-categorias');
            categoriasCt.empty();

            var categorias = response;

            if (categorias.length > 0) {
                for (var i = 0; i < categorias.length; i++) {

                    var categoria = categorias[i];
                    var NOME = categoria.nomE_CATEGORIA;
                    var IMG = categoria.imG_CATEGORIA;
                    var NOME_ID = NOME.replace(/\s+/g, '');;
                    var ID = categoria.id;

                    var catDiv = $('<div class="item-cat" id="' + NOME_ID + '">' +
                        '<div class="img-cat" onclick="listarSubCategorias(\'' + NOME + '\');">' +
                        '<img src="data:image/png;base64,' + IMG + '" />' +
                        '</div>' +
                        '<label id="name-cat">' + NOME + '</label>' +
                        '</div>');

                    categoriasCt.append(catDiv);
                }
                ocultaLoading();

                var primeiroItemCat = $('.itens-categorias .item-cat').first();

                if (primeiroItemCat.length > 0) {
                    // Obter o valor do ID do primeiro 'item-cat'
                    var nomeCat = primeiroItemCat.attr('id');
                    // Chamar a função listarSubCategorias passando o ID como parâmetro
                    listarSubCategorias(nomeCat);
                }

            } else {
                //alert("Nenhum encontrado.");
                ocultaLoading();
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            ocultaLoading();
        }
    });
}

function listarCategoriasIncluirAdmModal() {

    $.ajax({
        url: '/Home/ListarCategorias',
        type: 'POST',
        data: {},
        success: function (response) {

            var categoriaMaster = $('#categoriasAdmListModal');

            categoriaMaster.empty();

            var categorias = response;
            if (categorias.length > 0) {
                for (var i = 0; i < categorias.length; i++) {

                    var categoria = categorias[i];
                    var NOME = categoria.nomE_CATEGORIA;

                    var catDiv = $('<option value="' + NOME + '">' + NOME + '</option>');

                    categoriaMaster.append(catDiv);
                }
            } else {
                exibeMsgRetorno("Nenhuma categoria encontrada!", "erro");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarCategoriasAtualizarAdmModal() {

    $.ajax({
        url: '/Home/ListarCategorias',
        type: 'POST',
        data: {},
        success: function (response) {

            var categoriaMaster = $('#categoriaAtualizarProduto');

            categoriaMaster.empty();

            var categorias = response;
            if (categorias.length > 0) {
                for (var i = 0; i < categorias.length; i++) {

                    var categoria = categorias[i];
                    var NOME = categoria.nomE_CATEGORIA;

                    var catDiv = $('<option value="' + NOME + '">' + NOME + '</option>');

                    categoriaMaster.append(catDiv);
                }
            } else {
                exibeMsgRetorno("Nenhuma categoria encontrada!", "erro");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarCategoriasIncluirAdmList() {

    $.ajax({
        url: '/Home/ListarCategorias',
        type: 'POST',
        data: {},
        success: function (response) {

            var categoriaMaster = $('#categoriasAdmList');
            categoriaMaster.empty();

            var categorias = response;
            if (categorias.length > 0) {
                categoriaMaster.append('<option class="nameListcatAdm" value="" selected>Todas</option>');
                for (var i = 0; i < categorias.length; i++) {

                    var categoria = categorias[i];
                    var NOME = categoria.nomE_CATEGORIA;

                    var catDiv = $('<option class="nameListcatAdm" value="' + NOME + '">' + NOME + '</option>');

                    categoriaMaster.append(catDiv);
                }
            } else {
                exibeMsgRetorno("Nenhuma categoria encontrada!", "erro");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarSubCategoriasIncluirProd(categoria) {

    $.ajax({
        url: '/Home/ListarSubCategorias',
        type: 'POST',
        data: { cat: categoria },
        success: function (response) {

            var subCategoria = $('#subCategoriaProd');
            subCategoria.empty();

            var subCategorias = response;
            if (subCategorias.length > 0) {
                subCategoria.append('<option value="" selected >Nenhum</option>');
                for (var i = 0; i < subCategorias.length; i++) {

                    var categoria = subCategorias[i];
                    var NOME = categoria.nomE_SUB_CATEGORIA;

                    var catDiv = $('<option value="' + NOME + '">' + NOME + '</option>');

                    subCategoria.append(catDiv);
                }
            } else {
                alert("Nenhum encontrado.");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarSubCategoriasIncluirAdmModal(categoria) {
    $.ajax({
        url: '/Home/ListarSubCategorias',
        type: 'POST',
        data: { cat: categoria },
        success: function (response) {

            var subCategoria = $('#subCategoriasAdmListModal');

            subCategoria.empty();

            var subCategorias = response;
            if (subCategorias.length > 0) {
                for (var i = 0; i < subCategorias.length; i++) {

                    var categoria = subCategorias[i];
                    var NOME = categoria.nomE_SUB_CATEGORIA;

                    var catDiv = $('<option value="' + NOME + '">' + NOME + '</option>');

                    subCategoria.append(catDiv);
                }
            } else {
                exibeMsgRetorno("Nenhuma sub-categoria encontrada!", "erro");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarSubCategoriasAtualizarAdmModal(categoria) {

    $.ajax({
        url: '/Home/ListarSubCategorias',
        type: 'POST',
        data: { cat: categoria },
        success: function (response) {

            var subCategoria = $('#subCategoriaAtualizarProduto');

            subCategoria.empty();

            var subCategorias = response;
            if (subCategorias.length > 0) {
                for (var i = 0; i < subCategorias.length; i++) {

                    var categoria = subCategorias[i];
                    var NOME = categoria.nomE_SUB_CATEGORIA;

                    var catDiv = $('<option value="' + NOME + '">' + NOME + '</option>');

                    subCategoria.append(catDiv);
                }
            } else {
                exibeMsgRetorno("Nenhuma sub-categoria encontrada!", "erro");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarSubCategoriasIncluirAdmList(categoria) {
    if (categoria == "") {
        listarProdutosListAdm("allList");
    } else {

        listarProdutosListAdm('all');
        $.ajax({
            url: '/Home/ListarSubCategorias',
            type: 'POST',
            data: { cat: categoria },
            success: function (response) {

                var subCategoria = $('#subCategoriasAdmList');
                subCategoria.empty();

                var subCategorias = response;
                if (subCategorias.length > 0) {
                    subCategoria.append('<option class="nameListSubCat" value="" selected>Todas</option>');
                    for (var i = 0; i < subCategorias.length; i++) {

                        var categoria = subCategorias[i];
                        var NOME = categoria.nomE_SUB_CATEGORIA;

                        var catDiv = $('<option class="nameListSubCat" value="' + NOME + '">' + NOME + '</option>');
                        subCategoria.append(catDiv);
                    }
                } else {
                    var catDiv = $('<option value="" >Todas</option>');
                    subCategoria.append(catDiv);
                }
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }



}

function incluirSubCategoria() {
    var nomeCategoria = $('#listCategoriaIncSub').val();
    var nomeSubCategoria = $('#nomeIncluirSubCategoria').val();

    if (validaIncluirSubCategoria()) {
        $.ajax({
            url: '/Home/AdicionarSubCategoria',
            type: 'POST',
            data: {
                NOME_CATEGORIA: nomeCategoria,
                NOME_SUB_CATEGORIA: nomeSubCategoria
            },
            success: function (response) {
                console.log('Sucesso');
                fechaModalIncluirSubCategoria();
                $('#nomeIncluirSubCategoria').val("");
                exibeMsgRetorno("Sub-Categoria incluida com sucesso!", "sucesso");
                listarSubCategoriasQTD();

                atualizaListModalEadm();
            },
            error: function (xhr, status, error) {

                console.error('Erro na requisição AJAX:', error);
            }
        });
    }



}

function validaIncluirSubCategoria() {

    var nomeCategoria = $('#listCategoriaIncSub').val();
    var nomeSubCategoria = $('#nomeIncluirSubCategoria').val();

    //TITULO
    if (nomeCategoria == null || nomeCategoria == "") {
        $('#listCategoriaIncSub').focus();
        exibeMsgRetorno("Categoria é obrigatório!");
        return false;
    }

    //TITULO
    if (nomeSubCategoria == null || nomeSubCategoria == "") {
        $('#nomeIncluirCategoria').focus();
        exibeMsgRetorno("Nome da Sub-Categoria é obrigatório!");
        return false;
    }

    return true;

}

function listarSubCategorias(categoria) {

    removerClasseActiveCategorias();

    var cat_sub = categoria.replace(/\s+/g, '');;
    var id_categoria = "#" + cat_sub;
    $(id_categoria).addClass('active');

    $.ajax({
        url: '/Home/ListarSubCategorias',
        type: 'POST',
        data: { cat: categoria },
        success: function (response) {
            var subCategoriasCt = $('.sub-itens');
            subCategoriasCt.empty();

            var subCategorias = response;

            if (subCategorias.length > 0) {
                for (var i = 0; i < subCategorias.length; i++) {

                    var subCategoria = subCategorias[i];
                    var NOME = subCategoria.nomE_SUB_CATEGORIA;
                    var NOME_ID = NOME.replace(/\s+/g, '');;

                    var subcatDiv = $('<div class="item-sub" id="' + NOME_ID + '" onclick="listarProdutos(\'' + NOME + '\');" >' + NOME + '</div>');

                    subCategoriasCt.append(subcatDiv);
                }

                /*
                var primeiroItemSubCat = $('.sub-itens .item-sub').first();
                if (primeiroItemSubCat.length > 0) {
                    var nomeSubCat = primeiroItemSubCat.attr('id');
                    listarProdutos(nomeSubCat);
                } */

                var primeiroItemSubCat = $('.sub-itens .item-sub').first();

                if (primeiroItemSubCat.length > 0) {
                    var nomeSubCat = primeiroItemSubCat.text().trim();
                    listarProdutos(nomeSubCat);
                }

            } else {
                subCategoriasCt.append('<div class="item-sub active">Todos</div>');
                listarProdutos('todos');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; // Pega a parte do Base64 após a vírgula
            resolve(base64String);
        };

        reader.onerror = error => {
            reject(error);
        };

        reader.readAsDataURL(file); // Inicia a leitura do arquivo como uma URL Base64
    });
}

function incluirProduto() {

    var nomeProduto = $('#nomeIncluirProduto').val();
    var descProduto = $('#descIncluirProduto').val();
    var precoProduto = $('#precoIncluirProduto').val();
    var categoriaMaster = $('#categoriasAdmListModal').val();
    var subCategoria = $('#subCategoriasAdmListModal').val();

    var arqImg = document.getElementById('imgIncluirProduto');
    var img = arqImg.files[0];

    if (validaIncluirProduto()) {
        convertToBase64(img)
            .then(base64String => {
                $.ajax({
                    url: '/Home/AdicionarProduto',
                    type: 'POST',
                    data: {
                        IMG_PRODUTO: base64String,
                        NOME_PRODUTO: nomeProduto,
                        PRECO_PRODUTO: precoProduto,
                        DESC_PRODUTO: descProduto,
                        CATEGORIA_PRODUTO: categoriaMaster,
                        SUB_CATEGORIA_PRODUTO: subCategoria
                    },
                    success: function (response) {
                        console.log('Sucesso');
                        exibeMsgRetorno("produto incluido com sucesso!", "sucesso");

                        $('#nomeIncluirProduto').val("");
                        $('#descIncluirProduto').val("");
                        $('#precoIncluirProduto').val("");

                        $('#imagePreview').attr('src', '~/css/img/semImg.png');
                    },
                    error: function (xhr, status, error) {
                        console.error('Erro na requisição AJAX:', error);
                    }
                });
            })
            .catch(error => {
                console.error('Erro ao converter a imagem para Base64:', error);
            });
    }
}

function alterarProduto() {

    var idProduto = $('#idAtualizarProduto').val();
    var nomeProduto = $('#nomeAtualizarProduto').val();
    var descProduto = $('#descAtualizarProduto').val();
    var precoProduto = $('#precoAtualizarProduto').val();
    var categoriaMaster = $('#categoriaAtualizarProduto').val();
    var subCategoria = $('#subCategoriaAtualizarProduto').val();

    var img = $('#valImgAlterarProduto').val();


    if (validaAlterarProduto()) {
        if (img == "") {
            var arqImg = document.getElementById('fileImgIncluirProduto');
            var imgFile = arqImg.files[0];
            convertToBase64(imgFile)
                .then(base64String => {
                    $.ajax({
                        url: '/Home/AlterarProdutos',
                        type: 'POST',
                        data: {
                            ID: idProduto,
                            IMG_PRODUTO: base64String,
                            NOME_PRODUTO: nomeProduto,
                            PRECO_PRODUTO: precoProduto,
                            DESC_PRODUTO: descProduto,
                            CATEGORIA_PRODUTO: categoriaMaster,
                            SUB_CATEGORIA_PRODUTO: subCategoria
                        },
                        success: function (response) {
                            console.log('Sucesso');
                            exibeMsgRetorno("produto alterado com sucesso!", "sucesso");
                            $('.infoForm').hide();
                            $('.formPainelAtualizar').hide();
                            $('.formPainelIncluir').show();
                        },
                        error: function (xhr, status, error) {
                            console.error('Erro na requisição AJAX:', error);
                        }
                    });
                })
                .catch(error => {
                    console.error('Erro ao converter a imagem para Base64:', error);
                });
        } else {
            $.ajax({
                url: '/Home/AlterarProdutos',
                type: 'POST',
                data: {
                    ID: idProduto,
                    IMG_PRODUTO: img,
                    NOME_PRODUTO: nomeProduto,
                    PRECO_PRODUTO: precoProduto,
                    DESC_PRODUTO: descProduto,
                    CATEGORIA_PRODUTO: categoriaMaster,
                    SUB_CATEGORIA_PRODUTO: subCategoria
                },
                success: function (response) {

                    console.log('Sucesso');
                    exibeMsgRetorno("produto alterado com sucesso!", "sucesso");
                    $('.infoForm').hide();
                    $('.formPainelAtualizar').hide();
                    $('.formPainelIncluir').show();
                },
                error: function (xhr, status, error) {
                    console.error('Erro na requisição AJAX:', error);
                }
            });
        }
    }
}

function excluirProduto() {
    var idProduto = $('#idExcluirModal').val();
    $.ajax({
        url: '/Home/ExcluirrProdutos',
        type: 'POST',
        data: { ID: idProduto },
        success: function (response) {


            console.log('Sucesso');
            fechaModalExcluirProduto();
            exibeMsgRetorno("Produto excluido com sucesso!", "sucesso");
            listarProdutosListAdm("allList");
            listarProdutoQTD();
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });

}

function exibeModalIncluirProduto() {
    exibirModalEditResp();
    $('.infoForm').hide();
    $('.formPainelAtualizar').hide();
    $('.formPainelIncluir').show();
}

function exibeModalAtualizarProduto(ID, NOME, PRECO, DESC, CATEGORIA, SUB_CATEGORIA, IMG) {

    //$('.ct-painel-modalEdicao').attr('display', "block");
    exibirModalEditResp();
    listarSubCategoriasAtualizarAdmModal(CATEGORIA);
    exibiLoadingModalEdit();
    setTimeout(function () {
        function sanitizeText(text) {
            return text.replace(/<br\s*\/?>/gi, '\n');
        }

        DESC = sanitizeText(DESC);

        $('.infoForm').hide();
        $('.formPainelIncluir').hide();
        $('.formPainelAtualizar').show();

        $('#idAtualizarProduto').val(ID);
        $('#nomeAtualizarProduto').val(NOME);
        $('#precoAtualizarProduto').val(PRECO);
        $('#descAtualizarProduto').val(DESC);
        $('#categoriaAtualizarProduto').val(CATEGORIA);
        $('#subCategoriaAtualizarProduto').val(SUB_CATEGORIA);


        $('#valImgAlterarProduto').val(IMG);


        var base64String = IMG; // IMG é o código base64 que vem do banco
        var img = document.querySelector('#imgAtualizarProduto'); // Certifique-se de que é um <img>
        img.src = 'data:image/png;base64,' + base64String;
        img.alt = '';

        ocultaLoadingModalEdit();

    }, 500);



}

function exibeModalClonarProduto(NOME, PRECO, DESC, CATEGORIA, SUB_CATEGORIA) {

    function sanitizeText(text) {
        return text.replace(/<br\s*\/?>/gi, '\n');
    }

    DESC = sanitizeText(DESC);

    $('.infoForm').hide();
    $('.formPainelIncluir').show();
    $('.formPainelAtualizar').hide();

    $('#nomeIncluirProduto').val(NOME + '- (Cópia)');
    $('#precoIncluirProduto').val(PRECO);
    $('#descIncluirProduto').val(DESC);
    $('#categoriasAdmListModal').val(CATEGORIA);
    $('#subCategoriasAdmListModal').val(SUB_CATEGORIA);

    exibeMsgRetorno("Insira uma imagem", "sucesso")


}

function listarProdutos(subCategoria) {
    if (subCategoria != 'todos') {
        removerClasseActiveSubCategorias();
    }


    var cat_sub = subCategoria.replace(/\s+/g, '');;
    var id_subCategoria = "#" + cat_sub;
    $(id_subCategoria).addClass('active');

    

    $.ajax({
        url: '/Home/ListarProdutos',
        type: 'POST',
        data: { subCat: subCategoria },
        success: function (response) {

            var produtosCt = $('.itens-produtos');
            produtosCt.empty();

            var produtos = response;

            if (produtos.length > 0) {
                for (var i = 0; i < produtos.length; i++) {

                    var produto = produtos[i];

                    var ID = produto.id;
                    var NOME = produto.nomE_PRODUTO;
                    var PRECO = produto.precO_PRODUTO;
                    var DESC = produto.desC_PRODUTO;
                    var CATEGORIA = produto.categoriA_PRODUTO;
                    var SUB_CATEGORIA = produto.suB_CATEGORIA_PRODUTO;

                    function sanitizeText(text) {
                        return text
                            .replace(/'/g, "\\'")          // Escapa aspas simples
                            .replace(/"/g, '\\"')          // Escapa aspas duplas
                            .replace(/\r?\n|\r/g, '<br>');    // Substitui quebras de linha por espaços
                    }

                    // Suponha que 'DESC' seja o valor vindo do textarea
                    var DESC = sanitizeText(DESC);

                    var IMG = produto.imG_PRODUTO;

                    var prodDiv = $('<div class="item-prod zoom-div" onclick="abreModalProduto(\'' + IMG + '\', \'' + NOME + '\', \'' + PRECO + '\', \'' + DESC + '\')">' +
                        '<div class="img-produto">' +
                        '<img src="data:image/png;base64,' + IMG + '" />' +
                        '</div>' +
                        '<div class="infoProduto">' +
                        '<label class="nomeProduto">' + NOME + '</label>' +
                        '<label class="precoProduto">' + "R$" + PRECO + '</label>' +
                        '</div>' +
                        '</div > ');

                    produtosCt.append(prodDiv);
                }
                //ocultaLoading();
                ""
            } else {
                produtosCt.append('<h2 class="h2NehumProd"> Nenhum Produto Cadastrado </h2>');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            ocultaLoading();
        }
    });
}

function listarProdutosListAdm(subCategoria) {
    var categoria = $('#categoriasAdmList').val();

    if (categoria == "") { categoria = "all" }
    if (subCategoria == "") { subCategoria = "all" }

    if (subCategoria == "allList") {

        subCategoria = "all";
        categoria = "all";

        var sCat = $('#subCategoriasAdmList');
        sCat.empty();
        var cDiv = $('<option value="" >Todas</option>');
        sCat.append(cDiv);
    }

    $.ajax({
        url: '/Home/ListarProdutosAdm',
        type: 'POST',
        data: {
            cat: categoria,
            subCat: subCategoria
        },
        success: function (response) {

            var produtosCt = $('#tabeBodyProd');
            produtosCt.empty();

            var produtos = response;

            if (produtos.length > 0) {
                for (var i = 0; i < produtos.length; i++) {

                    var produto = produtos[i];

                    var ID = produto.id;
                    var NOME = produto.nomE_PRODUTO;
                    var PRECO = produto.precO_PRODUTO;
                    var DESC = produto.desC_PRODUTO;
                    var CATEGORIA = produto.categoriA_PRODUTO;
                    var SUB_CATEGORIA = produto.suB_CATEGORIA_PRODUTO;



                    function sanitizeText(text) {
                        return text
                            .replace(/'/g, "\\'")          // Escapa aspas simples
                            .replace(/"/g, '\\"')          // Escapa aspas duplas
                            .replace(/\r?\n|\r/g, '<br>');    // Substitui quebras de linha por espaços
                    }

                    var DESC = sanitizeText(DESC);

                    var IMG = produto.imG_PRODUTO;


                    if (NOME.length > 20) {
                        var NOME_SB = NOME.substring(0, 17) + '...';
                    } else {
                        var NOME_SB = NOME;
                    }

                    var prodDiv = $('<tr>' +
                        '<td class="imgDescProd"><img id="imgListAdm_' + ID + '" value="data:image/png;base64,' + IMG + '" src="data:image/png;base64,' + IMG + '" /></td>' +
                        '<td class="nomeDescProd"><div class="nomeIten" id="nomeListAdm_' + ID + '" >' + NOME_SB + '</div>' +
                        '<input type="hidden" id="descListAdm_' + ID + '" value="' + DESC + '" ></td>' +
                        '<td class="precoItenTd"><div class="precoIten" id="precoListAdm_' + ID + '">' + "R$ " + PRECO + '</div></td>' +
                        '<td><div class="catIten" id="categoriaListAdm_' + ID + '">' + CATEGORIA + '</div></td>' +
                        '<td class="subCatItenTd"><div class="subCatIten" id="subCategoriaListAdm_' + ID + '">' + SUB_CATEGORIA + '</div></td>' +
                        '<td>' +
                        '<div class="actionIten">' +
                        '<svg class="zoom-div2" onclick="exibeModalAtualizarProduto(\'' + ID + '\', \'' + NOME + '\', \'' + PRECO + '\', \'' + DESC + '\', \'' + CATEGORIA + '\', \'' + SUB_CATEGORIA + '\', \'' + IMG + '\')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />' +
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />' +
                        '</svg>' +
                        '<svg class="zoom-div2" onclick="abreModalExcluirProduto(\'' + ID + '\', \'' + NOME + '\', \'' + IMG + '\')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">' +
                        '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />' +
                        '<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />' +
                        '</svg>' +
                        '<svg class="zoom-div2" onclick="exibeModalClonarProduto(\'' + NOME + '\', \'' + PRECO + '\', \'' + DESC + '\', \'' + CATEGORIA + '\', \'' + SUB_CATEGORIA + '\')" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">' +
                        '<path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />' +
                        '</svg>' +
                        '</div>' +
                        '</td>' +
                        '</tr>');

                    produtosCt.append(prodDiv);
                }
            } else {
                produtosCt.append('<h2 class="h2NehumProd"> Nenhum Produto Cadastrado </h2>');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            ocultaLoading();
        }
    });
}

function exibiImg(img) {


    var base64String = img
    const div = document.querySelector('.exibir_img');

    // Limpa o conteúdo anterior da div, se houver
    div.innerHTML = '';

    // Cria um elemento <img>
    const imgElement = document.createElement('img');

    // Define o src da imagem com a string Base64
    imgElement.src = 'data:image/png;base64,' + base64String;
    imgElement.alt = 'Imagem carregada';

    // Adiciona a imagem à div
    div.appendChild(imgElement);
}

function exibeMsgRetorno(msg_exibicao, status) {

    $(".msg_retorno").hide();
    $('#msg_text_rs').html("");

    var svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">' +
        '<path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>' +
        '</svg>';

    $('#msg_text_rs').html(svgIcon + "&nbsp;" + msg_exibicao);

    if (status == "sucesso") {
        var msg_retorno = document.getElementById('msg_retorno_text');
        msg_retorno.style.backgroundColor = '#1d34bf';

        $('html, body').animate({
            scrollTop: $('.msg_retorno').offset().top
        }, 1000);

        $(".msg_retorno").fadeIn('slow');

        setTimeout(function () {
            $(".msg_retorno").fadeOut('slow');
        }, 3500);

    } else {
        var msg_retorno = document.getElementById('msg_retorno_text');
        msg_retorno.style.backgroundColor = '#b70101';

        $('html, body').animate({
            scrollTop: $('.msg_retorno').offset().top
        }, 1000);

        $(".msg_retorno").fadeIn('slow');

        setTimeout(function () {
            $(".msg_retorno").fadeOut('slow');
        }, 3500);
    }


}

function exibeMsgRetornoLogin(msg_exibicao, status) {

    $(".msg_retorno_login").hide();
    $('#msg_text_rs_login').html("");

    var svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">' +
        '<path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>' +
        '</svg>';

    $('#msg_text_rs_login').html(svgIcon + "&nbsp;" + msg_exibicao);

    if (status == "sucesso") {
        var msg_retorno = document.getElementById('msg_retorno_text_login');
        msg_retorno.style.backgroundColor = '#1d34bf';

        $('html, body').animate({
            scrollTop: $('.msg_retorno_login').offset().top
        }, 1000);

        $(".msg_retorno_login").fadeIn('slow');

        setTimeout(function () {
            $(".msg_retorno_login").fadeOut('slow');
        }, 3500);

    } else {
        var msg_retorno = document.getElementById('msg_retorno_text_login');
        msg_retorno.style.backgroundColor = '#b70101';

        $('html, body').animate({
            scrollTop: $('.msg_retorno_login').offset().top
        }, 1000);

        $(".msg_retorno_login").fadeIn('slow');

        setTimeout(function () {
            $(".msg_retorno_login").fadeOut('slow');
        }, 3500);
    }


}

function clickArquivoImgIncluirProd() {
    document.getElementById('imgIncluirProduto').click();
}

function clickArquivoImgAlterarProd() {
    //document.getElementById('imgAtualizarProduto').src = './img/semImg.png';
    document.getElementById('fileImgIncluirProduto').click();
}

function exibeImgIncluirProd() {

    var arqImg = document.getElementById('imgIncluirProduto');
    var file = arqImg.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

}

function exibeImgAlterarProd() {
    var arqImg = document.getElementById('fileImgIncluirProduto');
    var file = arqImg.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#valImgAlterarProduto').val("");
            document.getElementById('imgAtualizarProduto').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

}

function validaIncluirProduto() {

    var nomeProduto = $('#nomeIncluirProduto').val();
    var descProduto = $('#descIncluirProduto').val();
    var precoProduto = $('#precoIncluirProduto').val();
    var categoriaMaster = $('#categoriasAdmListModal').val();
    var subCategoria = $('#subCategoriasAdmListModal').val();

    var arqImg = document.getElementById('imgIncluirProduto');
    var img = arqImg.files[0];

    //IMAGEM
    if (img == null || img == "" || img == undefined) {
        exibeMsgRetorno("Imagem é obrigatório!");
        return false;
    }

    //TITULO
    if (nomeProduto == null || nomeProduto == "") {
        $('#nomeIncluirProduto').focus();
        exibeMsgRetorno("Título é obrigatório!");
        return false;
    }

    //PREÇO
    if (precoProduto == null || precoProduto == "") {
        $('#precoIncluirProduto').focus();
        exibeMsgRetorno("Preço é obrigatório!");
        return false;
    }

    //CATEGORIA
    if (categoriaMaster == null || categoriaMaster == "") {
        $('#categoriasAdmListModal').focus();
        exibeMsgRetorno("Categoria é obrigatório!");
        return false;
    }

    //SUB-CATEGORIA
    if (subCategoria == null || subCategoria == "") {
        $('#subCategoriasAdmListModal').focus();
        exibeMsgRetorno("Sub-Categoria é obrigatório!");
        return false;
    }

    //DESCRIÇÃO
    if (descProduto == null || descProduto == "") {
        $('#descIncluirProduto').focus();
        exibeMsgRetorno("Descrição é obrigatório!");
        return false;
    }

    return true;
}

function validaAlterarProduto() {

    var nomeProduto = $('#nomeAtualizarProduto').val();
    var descProduto = $('#descAtualizarProduto').val();
    var precoProduto = $('#precoAtualizarProduto').val();
    var categoriaMaster = $('#categoriaAtualizarProduto').val();
    var subCategoria = $('#subCategoriaAtualizarProduto').val();


    var img = $('#valImgAlterarProduto').val();
    if (img == "") {
        var arqImg = document.getElementById('fileImgIncluirProduto');
        img = arqImg.files[0];
    }

    //IMAGEM
    if (img == null || img == "" || img == undefined) {
        exibeMsgRetorno("Imagem é obrigatório!");
        return false;
    }

    //TITULO
    if (nomeProduto == null || nomeProduto == "") {
        $('#nomeIncluirProduto').focus();
        exibeMsgRetorno("Título é obrigatório!");
        return false;
    }

    //PREÇO
    if (precoProduto == null || precoProduto == "") {
        $('#precoIncluirProduto').focus();
        exibeMsgRetorno("Preço é obrigatório!");
        return false;
    }

    //CATEGORIA
    if (categoriaMaster == null || categoriaMaster == "") {
        $('#categoriasAdmListModal').focus();
        exibeMsgRetorno("Categoria é obrigatório!");
        return false;
    }

    //SUB-CATEGORIA
    if (subCategoria == null || subCategoria == "") {
        $('#subCategoriasAdmListModal').focus();
        exibeMsgRetorno("Sub-Categoria é obrigatório!");
        return false;
    }

    //DESCRIÇÃO
    if (descProduto == null || descProduto == "") {
        $('#descIncluirProduto').focus();
        exibeMsgRetorno("Descrição é obrigatório!");
        return false;
    }

    return true;
}

function mascaraNumValorIncluir() {
    var preco = $('#precoIncluirProduto').val();
    preco = preco.replace(/\D/g, '');  // Remove tudo que não for dígito

    // Limita o comprimento a 5 dígitos no total
    preco = preco.slice(0, 5);

    let resultadoFormatado;
    const comprimento = preco.length;

    // Adapta a exibição conforme a quantidade de dígitos inseridos
    if (comprimento === 0) {
        resultadoFormatado = '0,00';
    } else if (comprimento === 1) {
        resultadoFormatado = `0,0${preco}`;
    } else if (comprimento === 2) {
        resultadoFormatado = `0,${preco}`;
    } else if (comprimento === 3) {
        resultadoFormatado = `${preco.slice(0, 1)},${preco.slice(1)}`;
    } else if (comprimento === 4) {
        resultadoFormatado = `${parseInt(preco.slice(0, 2))},${preco.slice(2)}`;
    } else {
        resultadoFormatado = `${parseInt(preco.slice(0, 3))},${preco.slice(3)}`;
    }

    // Atualiza o valor do campo input
    $('#precoIncluirProduto').val(resultadoFormatado);
}

function mascaraNumValorAtualizar() {
    var preco = $('#precoAtualizarProduto').val();
    preco = preco.replace(/\D/g, '');  // Remove tudo que não for dígito

    // Limita o comprimento a 5 dígitos no total
    preco = preco.slice(0, 5);

    let resultadoFormatado;
    const comprimento = preco.length;

    // Adapta a exibição conforme a quantidade de dígitos inseridos
    if (comprimento === 0) {
        resultadoFormatado = '0,00';
    } else if (comprimento === 1) {
        resultadoFormatado = `0,0${preco}`;
    } else if (comprimento === 2) {
        resultadoFormatado = `0,${preco}`;
    } else if (comprimento === 3) {
        resultadoFormatado = `${preco.slice(0, 1)},${preco.slice(1)}`;
    } else if (comprimento === 4) {
        resultadoFormatado = `${parseInt(preco.slice(0, 2))},${preco.slice(2)}`;
    } else {
        resultadoFormatado = `${parseInt(preco.slice(0, 3))},${preco.slice(3)}`;
    }

    // Atualiza o valor do campo input
    $('#precoAtualizarProduto').val(resultadoFormatado);
}

function exibeModalIncluirCategoria() {
    listarCategoriasIncluirCatCrud();
    $('.containerCrudCategoria').show();
    $('body').css('overflow', 'auto');
}

function fechaModalIncluirCategoria() {
    $('#imagePreview-inc-cat').attr('src', './css/img/semImg.png');
    $('#nomeIncluirCategoria').val("");
    $('.addCategoria-ct').show();
    $('.excCategoria-ct').hide();
    $('.containerCrudCategoria').hide();
    $('body').css('overflow', 'auto');
}

function clickArquivoImgIncluiCategoria() {
    document.getElementById('artImgIncluirCat').click();
}

function exibeImgIncluirCategoria() {
    var arqImg = document.getElementById('artImgIncluirCat');
    var file = arqImg.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview-inc-cat').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

}

function listarCategoriasIncluirCatCrud() {

    $.ajax({
        url: '/Home/ListarCategorias',
        type: 'POST',
        data: {},
        success: function (response) {

            var categoriaMaster = $('#listCat-CrudCat');
            categoriaMaster.empty();

            var categorias = response;
            if (categorias.length > 0) {
                categoriaMaster.append('<option value="addCatCrud" selected>-- Adicionar Categoria --</option>');
                for (var i = 0; i < categorias.length; i++) {

                    var categoria = categorias[i];
                    var NOME = categoria.nomE_CATEGORIA;
                    var ID = categoria.id;

                    var catDiv = $('<option value="' + ID + '">' + NOME + '</option>');

                    categoriaMaster.append(catDiv);
                }
            } else {
                exibeMsgRetorno("Nenhuma categoria encontrada!", "erro");
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function listarCategoriasIncluirSubCat() {

    $.ajax({
        url: '/Home/ListarCategorias',
        type: 'POST',
        data: {},
        success: function (response) {

            var categoriaMaster = $('#listCategoriaIncSub');
            categoriaMaster.empty();

            var categorias = response;
            if (categorias.length > 0) {
                categoriaMaster.append('<option value="" selected>-- Escolha uma opção --</option>');
                for (var i = 0; i < categorias.length; i++) {

                    var categoria = categorias[i];
                    var NOME = categoria.nomE_CATEGORIA;
                    var ID = categoria.id;

                    var catDiv = $('<option value="' + NOME + '">' + NOME + '<input value="' + ID + '" type="hidden" disabled /></option>');

                    categoriaMaster.append(catDiv);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function retornaImgExclusao(opcao) {
    $.ajax({
        url: '/Home/ListarCategoriasId',
        type: 'POST',
        data: { id: opcao },
        success: function (response) {
            var categorias = response;
            var categoria = categorias[0];
            var IMG = categoria.imG_CATEGORIA;
            var ID = categoria.id;
            var NOME = categoria.nomE_CATEGORIA;
            var imgConvert = 'data:image/png;base64,' + IMG;
            $('#imagePreview-exc-cat').attr('src', imgConvert);
            $('#nomeExcluirCat').val(NOME);
            $('#idExcluirCat').val(ID);
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            return 'Null, 0';
        }
    });
}

function opcaoCrudCategoria(opcao) {

    if (opcao == "addCatCrud") {
        $('#imagePreview-inc-cat').attr('src', './css/img/semImg.png');
        $('#nomeIncluirCategoria').val("");
        $('.addCategoria-ct').show();
        $('.excCategoria-ct').hide();

    } else {
        $('.addCategoria-ct').hide();
        $('.excCategoria-ct').show();
        retornaImgExclusao(opcao);

    }
}

function excluirItemCategoria() {
    var nomeCategoria = $('#nomeExcluirCat').val();
    var idCategoria = $('#idExcluirCat').val();

    if (confirm("Deseja excluir esta categoria?")) {
        $.ajax({
            url: '/Home/ExcluirItemCategoria',
            type: 'POST',
            data: {
                ID: idCategoria,
                NOME: nomeCategoria
            },
            success: function (response) {
                console.log('Sucesso');
                fechaModalIncluirCategoria();
                exibeMsgRetorno("Categoria excluida com sucesso!", "sucesso");
                listarCategoriasQTD();

                $('#imagePreview-inc-cat').attr('src', './css/img/semImg.png');
                $('#nomeIncluirCategoria').val("");

                excluirTodosSubCategoria(nomeCategoria);
                atualizaListModalEadm();
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function excluirItemSubCategoria() {
    var idSubCategoria = $('#listCategoriaIncSubCat').val();
    if (confirm("Deseja excluir esta sub-categoria?")) {
        $.ajax({
            url: '/Home/ExcluirItemSubCategoria',
            type: 'POST',
            data: {
                ID: idSubCategoria
            },
            success: function (response) {
                fechaModalIncluirSubCategoria();
                exibeMsgRetorno("Sub-Categoria excluida com sucesso!", "sucesso");
                listarSubCategoriasQTD();
                $('#nomeIncluirSubCategoria').val("");

                atualizaListModalEadm();
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
}

function excluirTodosSubCategoria(subCategoria) {
    $.ajax({
        url: '/Home/ExcluirTodosSubCategoria',
        type: 'POST',
        data: {
            subCategoria: subCategoria
        },
        success: function (response) {
            
            listarSubCategoriasQTD();
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}


function listarSubCategoriasIncluirSubCat(catPadrao) {

    $.ajax({
        url: '/Home/ListarSubCategorias',
        type: 'POST',
        data: { cat: catPadrao },
        success: function (response) {

            var subCategoria = $('#listCategoriaIncSubCat');

            subCategoria.empty();

            var subCategorias = response;
            if (subCategorias.length > 0) {
                subCategoria.append('<option value="" selected> -- Adicionar Sub-Categoria --</option>');
                for (var i = 0; i < subCategorias.length; i++) {

                    var categoria = subCategorias[i];
                    var NOME = categoria.nomE_SUB_CATEGORIA;
                    var ID = categoria.id;

                    var catDiv = $('<option value="' + ID + '">' + NOME + '</option>');

                    subCategoria.append(catDiv);
                }
            } else {
                subCategoria.append('<option value="" selected>-- Adicionar Sub-Categoria --</option>');
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function exibeModalIncluirSubCategoria() {
    listarCategoriasIncluirSubCat();
    var catPadrao = $('#listCategoriaIncSub').val();
    $('.containerSubCrudCategoria').show();
    $('body').css('overflow', 'auto');
}

function fechaModalIncluirSubCategoria() {
    $('.addSubCategoria-ct').show();
    $('.excSubCategoria-ct').hide();
    $('.containerSubCrudCategoria').hide();
    listarSubCategoriasIncluirSubCat("null");

    $('body').css('overflow', 'auto');
}

function selecionaOpcaoCrudSubCategoria() {
    var opSeleciona = $('#listCategoriaIncSubCat').val();
    if (opSeleciona == "") {
        $('.addSubCategoria-ct').show();
        $('.excSubCategoria-ct').hide();
    } else {
        $('.addSubCategoria-ct').hide();
        $('.excSubCategoria-ct').show();
    }
}

function exibiLoadingModalEdit() {
    $('.ct-loading-modalEdit').show();
    $('.infoForm').hide();
    $('.formPainelAtualizar').hide();
    $('.formPainelIncluir').hide();
}

function ocultaLoadingModalEdit() {
    $('.ct-loading-modalEdit').hide();
    $('.infoForm').hide();
    $('.formPainelAtualizar').show();
    $('.formPainelIncluir').hide();
}

function fecharModalEditResp() {
    $('.ct-painel-modalEdicao').hide();
}

function exibirModalEditResp() {
    $('.ct-painel-modalEdicao').show();
}

function searchInputProduto(value) {
    
    $.ajax({
        url: '/Home/SearchInputProduto',
        type: 'POST',
        data: {
            valueInput: value
        },
        success: function (response) {

            var produtosList = $('#input-search');
            produtosList.empty();

            var produtos = response;
            
            if (produtos.length > 0) {
                var maxItems = 10;

                for (var i = 0; i < produtos.length && i < maxItems; i++) {

                    var produto = produtos[i];
                    var NOME_PRODUTO = produto.nomE_PRODUTO;
                    var ID = produto.id;

                    var prodDiv = $('<option value="' + NOME_PRODUTO + '" ></option>');
                    produtosList.append(prodDiv);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            ocultaLoading();
        }
    });
}

function searchInputProdutoModal(value) {

    $.ajax({
        url: '/Home/SearchInputProduto',
        type: 'POST',
        data: {
            valueInput: value
        },
        success: function (response) {

            var produtosList = $('.bodySearch_resultBusca');
            produtosList.empty();

            var produtos = response;

            if (produtos.length > 0) {
                var maxItems = 10;

                for (var i = 0; i < produtos.length && i < maxItems; i++) {

                    var produto = produtos[i];
                    var NOME_PRODUTO = produto.nomE_PRODUTO;
                    var IMG_PRODUTO = produto.imG_PRODUTO;
                    var ID = produto.id;
                    
                    var prodDiv = $('<div class="item_resultBusca" onclick="searchPesquisaModalID(\'' + NOME_PRODUTO + '\')" >'+
                                        '<div class="ctItem_resultBusca"><div class="img_resultBusca"><img src="data:image/png;base64,' + IMG_PRODUTO +'" /> </div><div class="name_resultBusca">' + NOME_PRODUTO +'</div></div>'+
					                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">'+
					                        '<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />'+
					                    '</svg>'+
					                '</div>');
                    produtosList.append(prodDiv);
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            ocultaLoading();
        }
    });
}

function buscaProdUnico(value) {
    if (value == "") {
        listarCategorias();
    } else {

        removerClasseActiveSubCategorias();
        removerClasseActiveCategorias();

        $.ajax({
            url: '/Home/SearchInputProduto',
            type: 'POST',
            data: {
                valueInput: value
            },
            success: function (response) {



                var produtosCt = $('.itens-produtos');
                produtosCt.empty();

                var produtos = response;

                if (produtos.length == 1) {
                    $('.item-prod').css('width', '280px');
                } else {
                    $('.item-prod').css('width', 'none');
                }

                if (produtos.length > 0) {
                    for (var i = 0; i < produtos.length; i++) {

                        var produto = produtos[i];

                        var ID = produto.id;
                        var NOME = produto.nomE_PRODUTO;
                        var PRECO = produto.precO_PRODUTO;
                        var DESC = produto.desC_PRODUTO;
                        var CATEGORIA = produto.categoriA_PRODUTO;
                        var SUB_CATEGORIA = produto.suB_CATEGORIA_PRODUTO;

                        var cat = CATEGORIA.replace(/\s+/g, '');
                        var id_categoria = "#" + cat;
                        $(id_categoria).addClass('active');

                        var cat_sub = SUB_CATEGORIA.replace(/\s+/g, '');
                        var id_subCategoria = "#" + cat_sub;
                        $(id_subCategoria).addClass('active');

                        function sanitizeText(text) {
                            return text
                                .replace(/'/g, "\\'")          // Escapa aspas simples
                                .replace(/"/g, '\\"')          // Escapa aspas duplas
                                .replace(/\r?\n|\r/g, '<br>');    // Substitui quebras de linha por espaços
                        }

                        // Suponha que 'DESC' seja o valor vindo do textarea
                        var DESC = sanitizeText(DESC);

                        var IMG = produto.imG_PRODUTO;

                        var prodDiv = $('<div class="item-prod zoom-div" onclick="abreModalProduto(\'' + IMG + '\', \'' + NOME + '\', \'' + PRECO + '\', \'' + DESC + '\')">' +
                            '<div class="img-produto">' +
                            '<img src="data:image/png;base64,' + IMG + '" />' +
                            '</div>' +
                            '<div class="infoProduto">' +
                            '<label class="nomeProduto">' + NOME + '</label>' +
                            '<label class="precoProduto">' + "R$" + PRECO + '</label>' +
                            '</div>' +
                            '</div > ');

                        produtosCt.append(prodDiv);

                    }

                    ""
                } else {
                    produtosCt.append('<h2 class="h2NehumProd"> Nenhum Produto Cadastrado </h2>');
                }
            },
            error: function (xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
                ocultaLoading();
            }
        });
    }
    
}

function searchPesquisaModalID(nameProd) {
    
    fechaSearchInputProdutoModal();
    buscaProdUnico(nameProd);
}

function fechaSearchInputProdutoModal() {
    $('body').css('overflow', 'auto');
    $('.containerTelaSearch').hide();
}

function abrirSearchInputProdutoModal() {
    $('body').css('overflow', 'hidden');
    $('.containerTelaSearch').fadeIn('slow');
}

function validaLogin() {

    var userUSUARIO = $('#id_usuario').val().toUpperCase();
    var pswSENHA = $('#id_senha').val().toUpperCase();

    function contaLogin(lg, psw) {
        if (lg.length < 5) {
            exibeMsgRetornoLogin("Usuario ou senha invalidos!");
            return false;
        }

        if (psw.length < 5) {
            exibeMsgRetornoLogin("Usuario ou senha invalidos!");
            return false;
        }

        return true;
    }

    var ctLogin = contaLogin(userUSUARIO, pswSENHA)

    if (ctLogin) {
        $.ajax({
            url: '/Login/ValidarLoginAutenticado',
            type: 'POST',
            data: {
                user: userUSUARIO,
                psw: pswSENHA,
                _token: '{{ csrf_token() }}'
            },
            success: function (response) {
                
                if (response.success == true) {
                    login();
                } else {
                    exibeMsgRetornoLogin("Usuario ou senha invalidos!");
                    $('#id_usuario').val("");
                    $('#id_senha').val("");
                    $('#id_usuario').focus();
                }

            },
            error: function (xhr, status, error) {
                exibeMsgRetornoLogin("Usuario ou senha invalidos!");
                $('#id_usuario').val("");
                $('#id_senha').val("");
                $('#id_usuario').focus();
            }
        });
    }
}

function login() {
    // Cria um formulário HTML
    var form = document.createElement('form');
    form.method = 'POST'; // ou 'GET', dependendo do seu controlador
    form.action = '/PainelAdm/Index'; // URL da sua controladora

    // Adiciona um campo oculto, se necessário
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'validate';
    input.value = 'true';
    form.appendChild(input);

    // Adiciona o formulário ao corpo do documento
    document.body.appendChild(form);

    // Envia o formulário
    form.submit();
}
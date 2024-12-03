document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get('id');

    // Verifica se o idProduto existe 
    if (!idProduto) {
        console.error('ID do produto não encontrado.');
        return;
    }

   
    document.getElementById('carregando').style.display = 'block';
    document.getElementById('produtoDetalhes').style.display = 'none'; 

    fetch(`http://localhost:8080/prod/prod/${idProduto}`)
        .then(response => response.json())
        .then(produto => {
            
            document.getElementById('carregando').style.display = 'none'; 
            document.getElementById('produtoDetalhes').style.display = 'block'; 
            document.getElementById('produtoDetalhes').innerHTML = `
                <div class="detalhes-container">
                    <div class="produto-imagem">
                        <img src="${produto.foto}" alt="${produto.nome}" />
                    </div>
                    <div class="produto-info">
                        <h1 id="nomeProduto">${produto.nome}</h1>
                        <p id="precoProduto">${produto.preco}</p>
                        <p id="descricaoProduto">${produto.descricao}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Erro ao carregar o produto:', error);
            document.getElementById('produtoDetalhes').innerHTML = `
                <p>Erro ao carregar o produto. Tente novamente mais tarde.</p>
            `;
        });
});

// Função para adicionar um novo produto
async function adicionarProduto() {
    const nome = prompt("Digite o nome do produto:");
    const descricao = prompt("Digite a descrição do produto:");
    let preco = prompt("Digite o preço do produto:");
    const foto = prompt("Digite o URL da imagem do produto:");

    // Validações básicas
    if (!nome || !descricao || !preco || !foto) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    // Adiciona o prefixo "R$" ao preço, se não estiver presente
    preco = preco.startsWith('R$') ? preco : `R$ ${preco}`;

    const novoProduto = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        foto: foto 
    };

    try {
        // Requisição POST para o backend
        const response = await fetch('http://localhost:8080/prod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto)
        });

        if (response.ok) {
            const produtoCriado = await response.json(); // Recebe o produto criado do backend
            console.log('Produto criado com sucesso:', produtoCriado);

            
            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            produtos.push({
                id: produtoCriado.id, 
                nome: produtoCriado.nome,
                descricao: produtoCriado.descricao,
                preco: produtoCriado.preco,
                foto: produtoCriado.foto 
            });
            localStorage.setItem('produtos', JSON.stringify(produtos));

            // Atualiza a exibição dos produtos
            atualizarPaginaProdutos();
            alert('Produto criado com sucesso!');
        } else {
            console.error("Erro ao criar produto no backend:", response.statusText);
            alert('Erro ao criar o produto.');
        }
    } catch (error) {
        console.error("Erro ao criar o produto:", error);
        alert("Erro ao conectar ao servidor.");
    }
}

// Função para atualizar a exibição dos produtos
function atualizarPaginaProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const sectionProdutos = document.querySelector('.selecao_produtos');
    sectionProdutos.innerHTML = '';

    // Verifica a URL atual para determinar se os botões devem ser exibidos
    const urlAtual = window.location.pathname;
    const mostrarAcoes = urlAtual.includes('TodosProdutos.html'); // Exibe os botões apenas na página "TodosProdutos.html"

    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('descrição_Prudu');
        produtoDiv.id = produto.id;

        produtoDiv.innerHTML = `
            <div class="conteiner_produtos">
                <a class="clicar_produtos" href="/indexPRODUTOS/PageProduto${produto.id}.html">
                    <img class="img_produtos" src="${produto.foto}" alt="${produto.nome}">
                </a>
            </div>
            <h4>${produto.nome}</h4>
            <strong class="preço">${produto.preco}</strong>
        `;

        // Adiciona os botões de ação somente se "mostrarAcoes" for true
        if (mostrarAcoes) {
            const acoesDiv = document.createElement('div');
            acoesDiv.classList.add('acoes_produto');
            acoesDiv.innerHTML = `
                <button class="editar" onclick="editarProduto('${produto.id}')">Editar</button>
                <button class="excluir" onclick="excluirProduto('${produto.id}')">Excluir</button>
            `;
            produtoDiv.appendChild(acoesDiv);
        }

        sectionProdutos.appendChild(produtoDiv);
    });
}



function inicializarProdutos() {
    // Em branco para evitar a criação de produtos iniciais
    if (!localStorage.getItem('produtos')) {
        localStorage.setItem('produtos', JSON.stringify([])); // Inicializa como vazio
    }
}


inicializarProdutos();
atualizarPaginaProdutos();



// Função para excluir um produto
async function excluirProduto(id) {
    // Confirmação antes de excluir o produto
    const confirmacao = confirm("Tem certeza que deseja excluir este produto?");

    if (confirmacao) {
        try {
            // Requisição DELETE ao backend
            const response = await fetch(`http://localhost:8080/prod/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
                produtos = produtos.filter(produto => produto.id !== id);

                // Atualiza o localStorage com os produtos restantes
                localStorage.setItem('produtos', JSON.stringify(produtos));

                // Atualiza a exibição dos produtos na página
                atualizarPaginaProdutos();

                alert("Produto excluído com sucesso!");
            } else if (response.status === 404) {
                alert("Produto não encontrado no backend.");
            } else {
                alert("Erro ao excluir produto no backend.");
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            alert("Erro ao conectar ao servidor.");
        }
    } else {
        console.log("Exclusão cancelada.");
    }
}


// Função para editar um produto
async function editarProduto(id) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos.find(prod => prod.id === id);

    if (produto) {
        let novoNome = prompt("Digite o novo nome do produto:", produto.nome);
        let novaDescricao = prompt("Digite a nova descrição do produto:", produto.descricao);
        let novoPreco = prompt("Digite o novo preço do produto:", produto.preco);
        let novaFoto = prompt("Digite o novo URL da imagem do produto:", produto.foto);

        // Adiciona o prefixo "R$" se não estiver presente
        novoPreco = novoPreco.startsWith('R$') ? novoPreco : `R$ ${novoPreco}`;

        // Atualiza o objeto local
        produto.nome = novoNome;
        produto.descricao = novaDescricao;
        produto.preco = novoPreco;
        produto.foto = novaFoto;

        // Atualiza o produto no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));

        // Atualiza a página
        atualizarPaginaProdutos();

        // Requisição PUT para atualizar o produto no backend
        const response = await fetch(`http://localhost:8080/prod/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (response.ok) {
            alert('Produto atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar produto.');
        }
    }
}

// Inicializa os produtos e exibe na página
inicializarProdutos();
atualizarPaginaProdutos();

const readline = require('readline-sync');

console.log('Seja bem vindo ao menu de Estoque da Dendê Tech!')
// Sistema de Controle de Estoque Simples
let estoque = [];

// Funções para manipulação do estoque

// Função para adicionar um produto ao estoque
function adicionarProduto() {
    const nome = readline.question('Digite o nome do produto: ');
    const quantidade = parseInt(readline.question('Digite a quantidade: '), 10);
    const codigo = readline.question('Digite o código do produto: ');
    const preco = parseFloat(readline.question('Digite o preço do produto: '));
    estoque.push({ nome, quantidade, codigo, preco});
    console.log('Produto adicionado com sucesso!');
}

// Funções para listar um produto ao estoque
function listarProdutos() {
    console.log('\n== Produtos no Estoque ==');
    if (estoque.length === 0) {
        console.log('Nenhum produto no estoque.');
    } else {
        estoque.forEach((produto, index) => {
            console.log(`${index + 1}. ${produto.nome} - Quantidade: ${produto.quantidade} - Código: ${produto.codigo} - Preço: R$${produto.preco.toFixed(2)}`);
        });
    }
}

// Funções para atualizar um produto ao estoque
function atualizarProduto() {
    listarProdutos();
    const index = parseInt(readline.question('Digite o número do produto que deseja atualizar: '), 10) - 1;
    if (index >= 0 && index < estoque.length) {
        const nome = readline.question('Digite o novo nome do produto: ');
        const quantidade = parseInt(readline.question('Digite a nova quantidade: '), 10);
        const codigo = readline.question('Digite o novo código do produto: ');
        const preco = parseFloat(readline.question('Digite o novo preço do produto: '));
        estoque[index].nome = nome;
        estoque[index].quantidade = quantidade;
        estoque[index].codigo = codigo;
        estoque[index].preco = preco;
        console.log('Quantidade atualizada com sucesso!');
    } else {
        console.log('Produto inválido.');
    }
}

// Função para remover um produto do estoque
function removerProduto() {
    listarProdutos();
    const index = parseInt(readline.question('Digite o número do produto que deseja remover: '), 10) - 1;
    if (index >= 0 && index < estoque.length) {
        estoque.splice(index, 1);
        console.log('Produto removido com sucesso!');
    } else {
        console.log('Produto inválido.');
    }
}

// FUnção para salvar os produtos em um arquivo CSV
function salvarProdutosCSV() {
    const fs = require('fs');
    const csvContent = estoque.map(produto => `Nome: ${produto.nome}| Quantidade: ${produto.quantidade}| Código: ${produto.codigo}| Preço: ${produto.preco}`).join('\n');
    fs.writeFileSync('estoque.csv', csvContent);
    console.log('Produtos salvos no arquivo estoque.csv');
}

// Loop principal do menu
while (true) {
    console.log('\n== Menu ==');
    console.log('1 - Adicionar Produto');
    console.log('2 - Listar Produtos');
    console.log('3 - Atualizar Produto');
    console.log('4 - Remover Produto');
    console.log('5 - Salvar Produtos');
    console.log('6 - Sair');
    const opcao = parseInt(readline.question('Escolha uma opção: '), 10);

    // Executa a opção escolhida pelo usuário, chamando a função correspondente
    switch (opcao) {
        case 1:
            adicionarProduto();
            break;
        case 2:
            listarProdutos();
            break;
        case 3:
            atualizarProduto();
            break;
        case 4:
            removerProduto();
            break;
        case 5:
            salvarProdutosCSV();
            break;
        case 6:
            console.log('Saindo do sistema...');
            process.exit();
        default:
            console.log('Opção inválida.');
    }
}

const url = `https://gitlab.com/snippets/1818996/raw`  // endereço com o banco de dados corrompido
const axios = require (`axios`)                       // acessa arquivos remotos

/**Corrige o atributo quantity de um objeto,
 * este objeto é um elemento de um array. 
 * 
 * Se algum objeto não tiver o atributo quantity,
 * este será adionado ao objeto com o valor zero.
 * 
 * @param { } prod é obrigatório para o funcionamento correto da função.
 */


const corrigirQuantidade = prod => {

    prod.forEach(produto => {

        if(produto.quantity === undefined){

            produto.quantity = 0         // adiciona o atributo quantity no objeto com o valor zero
        }                               // a ordem do atributo quantity no arquivo json será diferente
                                       // nos objetos em que a quantidade não existia antes,mas como
                                      // um objeto é acessado pela sua chave e não pelo valor, isto não
                                     // não alterará a funcionalidade do programa
    })
}

// imprime as quantidades de cada produto

const imprimirQuantidadeCorrigida = prod => {

    prod.forEach(produto=> console.log(produto.quantity))
}

axios.get(url).then(response =>{  

    const produtos = response.data              // lê os dados contidos no endereço especificado pela url

    corrigirQuantidade(produtos)               // chamada de função que corrige o atributo quantity
    imprimirQuantidadeCorrigida(produtos)     // imprime as quantidades dos produtos
    console.log(produtos)                    // imprime a lista de produtos somente com as quantidades corretas
})
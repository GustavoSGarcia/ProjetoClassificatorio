const url = `https://gitlab.com/snippets/1818996/raw`  // endereço com o banco de dados corrompido
const axios = require (`axios`)                       // acessa arquivos remotos

const corrigirNomes = produto =>{

    produto.name = produto.name.replace(/æ/g,`a`)    // substitui todas as ocorrências do primeiro parâmetro pelo segundo
    produto.name = produto.name.replace(/¢/g,`c`)
    produto.name = produto.name.replace(/ø/g,`o`)
    produto.name = produto.name.replace(/ß/g,`b`)
}

const corrigirPrecos = produto =>{

    if(typeof produto.price !== Number){            // verifica se o tipo do atributo price é diferente de Number

        produto.price = Number(produto.price)       // transforma uma String em Number
    }
}

const corrigirQuantidade = produto =>{

    if(produto.quantity === undefined){          // verifica se o atributo quantity existe no objeto

        produto.quantity = 0                   // adiciona o atributo quantity no objeto com o valor zero
    }
}

/** Esta função corrige os atributos name, price e quantity 
 * de um banco de dados que foi corrompido. O banco de dados
 * é um array onde cada elemento é um objeto com os atributos 
 * citados anteriormente e mais 2 atributos com valores corretos.
 * 
 * Os caracteres substitutos no atributo name são:
 * "a" por "æ", "c" por "¢", "o" por "ø", "b" por "ß".
 * 
 * Todo valor de price que for do tipo String
 *será transformado em Number.
 *
 * Se algum objeto não tiver o atributo quantity,
 * este será adionado ao objeto com o valor zero.
 *
 * @param {Array} prod parâmetro obrigatório para o funcionamento correto da função.
 */
const corrigirDados = prod => {

    prod.forEach(produto => {

        corrigirNomes(produto)
        corrigirPrecos(produto)
        corrigirQuantidade(produto)
    })     
}

axios.get(url).then(response =>{           

    const produtos = response.data           // lê os dados contidos no endereço especificado pela url

    corrigirDados(produtos)                 // chamada de função que corrige o banco de dados 
    console.log(produtos)                  // imprime a lista de produtos com todos os dados corrigidos
})
const url = `https://gitlab.com/snippets/1818996/raw`   // endereço com o banco de dados corrompido
const axios = require (`axios`)                        // acessa arquivos remotos

/** Corrige o atributo name de um objeto,
 * este objeto é um elemento de um array.
 * 
 * Os caracteres substitutos no atributo name são:
 * "a" por "æ", "c" por "¢", "o" por "ø", "b" por "ß".
 * 
 * @param {Array} prod é obrigatório para o funcionamento correto da função.
 */

const corrigirNomes = prod => {

    prod.forEach(produto => {

        produto.name = produto.name.replace(/æ/g,`a`)  // substitui todas as ocorrências do primeiro parâmetro pelo segundo
        produto.name = produto.name.replace(/¢/g,`c`)
        produto.name = produto.name.replace(/ø/g,`o`)
        produto.name = produto.name.replace(/ß/g,`b`)
    })       
}

// imprime os nomes no formato correto

const imprimirNomesCorrigidos = prod => {

    prod.forEach(produto => console.log(produto.name)) 
}

axios.get(url).then(response =>{               // lê os dados contidos no endereço especificado pela url

    const produtos = response.data

    corrigirNomes(produtos)                  // chamada de função que corrige os nomes
    imprimirNomesCorrigidos(produtos)       // imprime os nomes no formato correto
    console.log(`\n`,produtos)                  // imprime a lista de produtos somente com os nomes corrigidos
})


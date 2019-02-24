const url = `https://gitlab.com/snippets/1818996/raw`         // endereço com o banco de dados corrompido
const axios = require (`axios`)                              // acessa arquivos remotos

/**Corrige o atributo price de um objeto,
 * este objeto é um elemento de um array.
 * 
 *Todo valor de price que for do tipo String
 *será transformado em Number.
 *
 * @param {Array} prod é obrigatório para o funcionamento correto da função.
 */
const corrigirPrecos = prod => {

    prod.forEach(produto => {

        if(typeof produto.price !== Number){      // verifica se o tipo do atributo price é diferente de Number

            produto.price = Number(produto.price)  // transforma uma String em Number
        }
    })
}

// imprime os tipos do atributo price

const imprimirTipoPrecosCorrigidos = prod => {

    prod.forEach(produto => console.log(typeof produto.price))

}

axios.get(url).then(response =>{

    const produtos = response.data         // lê os dados contidos no endereço especificado pela url

    corrigirPrecos(produtos)              // chamada de função que corrige os preços
    imprimirTipoPrecosCorrigidos(produtos)   // imprime os tipos atributo price
    console.log(`\n`,produtos)               // imprime a lista de produtos somente com os preços no formato correto
})

     
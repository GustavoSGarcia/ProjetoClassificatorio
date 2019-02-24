const url = `https://gitlab.com/GustavoSGarcia/banco-de-dados-corrigido/snippets/1829451/raw`   // endereço com o banco de dados corrigido
const axios = require (`axios`)                        // acessa arquivos remotos

/**Esta função exclui elementos repetidos
 * de um array se este já estiver ordenado.
 * 
 * @param {Array} atributos é obrigatório para o funcionamento correto da função.
 */

const excluiAtributosRepetidos = atributos =>{     // nesta função o array deve está ordenado

    const atributoSemRepetir = atributos.filter((atributo,i,atributos) =>  {  

        return atributos[i] !== atributos[i+1]            // filtra os atributos que são diferentes 
    })

    return atributoSemRepetir
}

/**Ordena um array de objetos de acordo com
 * o atributo passado por parâmetro.
 * 
 * @param {Array} prod seus elementos são objetos, o array é obrigatorio para o funcionamento correto da função.
 * @param {String} chave  representa a chave de um atributo.
 */

const ordenarPorAtributo = (prod,chave) => {

    const atributos = []

    let ehNumber = false

    prod.forEach(produto => {
        
        Object.entries(produto).forEach(e => {       // cada posição do array retornado por Object.entries(produto) é um array de duas posições
                                                    // a primeira posição é a chave, a segunda o valor
            if(`${e[0]}`=== chave){            

                if(typeof produto[`${chave}`] === `number`){
                    
                    const atr = Number(`${e[1]}`)       // transforma o valor que está em String em Number
                    
                    atributos.push(atr)       // insere o conteúdo chave no array de atributos Numbers

                    ehNumber = true
                }
                else{

                    atributos.push(`${e[1]}`)   // insere o conteúdo chave no array de atributos Strings
                }
            }
        })
    })

    if(ehNumber){

        return excluiAtributosRepetidos(atributos.sort((a,b) => a - b))   // exclui elementos ordenados de valores repetidos - Number
    }
    else{
    
         return excluiAtributosRepetidos(atributos.sort())      // exclui elementos ordenados de valores repetidos - String
    }
}
/**Imprime os nomes dos objetos de um array de acordo com
 * o atributo passado por parâmetro.
 * 
 * @param {Array} prod seus elementos são objetos, o array é obrigatorio para o funcionamento correto da função.
 * @param {String} chave  representa a chave de um atributo.
 */

const imprimirNomesPorAtributo = (prod,chave) => {

    const valoresAtributo = ordenarPorAtributo(prod,chave) // ordena os valores do atributo passado por parâmetro

    valoresAtributo.forEach(valorAtributo => {          // percorre o array de atributos

        prod.forEach(produto => {                  // percorre o array de produtos

            if(valorAtributo === produto[`${chave}`]){         // compara se eles têm valores iguais

                console.log(produto.name)             // Se os valores forem iguais imprime o nome do produto
            }
        })
    })
}




axios.get(url).then(response =>{               // lê os dados contidos no endereço especificado pela url

    const produtos = response.data

    console.log(`\nNomes ordenados por categoria :\n`)
    imprimirNomesPorAtributo(produtos,`category`)        // chamada de função que imprime os nomes ordenados por categoria 
    
    console.log(`\nNomes ordenados por id:\n`)                   
    imprimirNomesPorAtributo(produtos,`id`)      // chamada de função que imprime os nomes ordenados por id
    
})

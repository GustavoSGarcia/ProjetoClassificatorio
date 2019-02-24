const url = `https://gitlab.com/GustavoSGarcia/banco-de-dados-corrigido/snippets/1829451/raw`   // endereço com o banco de dados corrigido
const axios = require (`axios`)                        // acessa arquivos remotos

/**Esta função exclui elementos repetidos
 * de um array se este já estiver ordenado.
 * 
 * @param {Array} categorias é um array de Strings obrigatório para o funcionamento correto da função.
 */

const excluiCategoriasRepetidas = categorias =>{     // nesta função o array deve está ordenado

    const categoriasSemRepetir = categorias.filter((categoria,i,categorias) =>  {  

        return categorias[i] !== categorias[i+1]            // filtra as categorias que são diferentes 
    })

    return categoriasSemRepetir
}

/**Retorna um array de categorias
 * ordenados em ordem alfabética
 * 
 * @param {Array} prod é um array de objetos obrigatório para o funcionamento correto da função.
 */

const ordenarPorCategoria = prod => {

    const categorias = []

    prod.forEach(produto => {
        
        Object.entries(produto).forEach(e => {       // cada posição do array retornado por Object.entries(produto) é um array de duas posições
                                                    // a primeira posição é a chave, a segunda o valor
            if(`${e[0]}`===`category`){            // compara se chave é uma categoria

                categorias.push(`${e[1]}`)       // insere o conteúdo da categoria no array categorias
            }
        })
    })

    return excluiCategoriasRepetidas(categorias.sort())     
}

/**Retorna um array onde cada elemento
 * é o valor total do estoque de produtos por categoria.
 * 
 * @param {Array} prod é um array de objetos obrigatório para o funcionamento correto da função.
 */

const valorTotalPorCategoria = prod => {

    const categorias = ordenarPorCategoria(prod)       // array com categorias existentes no estoque em ordem alfabética.
    
    /*No trecho de código acima poderia ser criado um array manualmente com as 4 categorias existentes 
    ordenadas ou não, mas pensado que futuramente podem ser adicionadas novas categorias ao estoque foi 
    optado por implementar duas funções que retornam um array ordenado de forma automática, assim não 
    será necessário nenhum tipo de mudança nesta parte do código e garante uma boa organização*/
    


    const ValorTotalPorCategoria = []                 // array que será retornado pela função com o valor total por categoria

    categorias.forEach(categoria =>{

        let produtosCategoriaEspecifica = prod.filter(produto =>{    // a função filter retorna um array com elementos de uma única

            return categoria === produto.category                      // compara se as categorias são iguais   
        })
        
        let valorTotalPorItem = produtosCategoriaEspecifica.map(produto => produto.price * produto.quantity)  // retorna um array com o valor total de cada item
        ValorTotalPorCategoria.push(valorTotalPorItem.reduce(function(acumulador, item) { return acumulador + item}))  // soma  os valores totais dos itens de uma categoria específica

        })

    return ValorTotalPorCategoria
}

axios.get(url).then(response =>{               // lê os dados contidos no endereço especificado pela url

    const produtos = response.data           

    const categorias = ordenarPorCategoria(produtos)       //função que ordena as categorias de produtos
    const ValorTotal = valorTotalPorCategoria(produtos)   // função que calcula o valor total por categoria

    console.log(`O valor total do estoque  por categoria é :`)

    for(let i = 0; i < categorias.length; i++){

        console.log(`\n${categorias[i]}: R$${ValorTotal[i].toFixed(2)}`)  // imprime a categoria e seu respectivo valor total
    }
})


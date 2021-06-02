<h2>MARKET APP</h2>

<strong>Importante:</strong> existe outro projeto no meu repositório chamado <strong>MARKET-APP-CONTEXT-API-VERSION</strong> que utiliza ContextAPI para o compartilhamento de estado.

Este projeto é um app que simula parte dos sites de compras dos mercados. Nele, busca-se os produtos através de um API e rendezida-os na primeira tela ('/'). Ao clicar
sobre a imagem do produto, chega-se na tela desse produto em específico ('/product/id') onde é mostrado mais informações sobre a venda, como promoções. Nessa tela,
também é possível adicionar ou remover o produto no carrinho. Por fim, tem-se a tela do carrinho de compras, que é possível acessá-lo clicando sobre o carrinho no
header. Nele mostra as informações do produtos adicionados, inclusive com as ofertas e promoções aplicadas. Nessa tela também é possível alterar a quantidade de determinado
produto e removê-lo.

Os produtos que são adicionados no carrinho são armazenados no <strong>localStorage</strong> do usuário.

<h2>Tecnologias Utilidades</h2>
- HTML </br>
- SCSS </br>
- Typescript </br>
- ReactJS </br>
- React-Router-Dom </br>
- Toastify

<h2>Iniciando em seu computador</h2>
Para iniciar o projeto, deve-se seguir os seguintes passos:
> Crie um diretório e abra o terminal de comando nele

> git clone git@github.com:gbelther/market-app.git

> cd market-app

> yarn

> yarn start

Para que seja possível carregar os itens do mercado, é necessário uma API. Esta API deve conter:

```json
{
  delivery_tax: 9.9,
  items: [
    id: 1234,
    order_number: 23892736,
    price: 4.99,
    image: "https://...",
    description: "Abacaxi unidade...",
    stock: 5,
    offer?:3.99,
    promotion?: {
      kind: "buy-x-take-y",
      base: 3,
      value: 4
     }
  ]
}
```

A url desta API deve estar como variável ambiente no arquivo .env com a variável de nome REACT_APP_API_URL.

<h2>Imagens do Projeto</h2>

![image](https://user-images.githubusercontent.com/68357487/116165856-22609f80-a6d3-11eb-9cee-0796e1bc64ba.png)

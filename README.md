## Desafio
Desenvolva uma API REST para 2 entidades: produtos e clientes. Toda a arquitetura deve ser serverless utilizando Api Gateway, Lambda e DynamoDB. Cada entidade deve ter um lambda e tabela cada, garantindo a escalabilidade separada de cada componente do sistema. A API deve permitir operações CRUD básicas de coleção e recursos, através de verbos comuns: GET, POST e PUT. Nas rotas de consulta da coleção, permita que o client envie um parâmetro `filter` pela URL para filtragem de nomes que contenham o valor do parâmetro, por exemplo:

Um GET para `/produtos?filter=XYZ`

Deverá trazer os produtos que contenham a string `XYZ`

## Resultado
A entrega do seu código deve ser feita no formato de PR para este repositório e deve conter:
  - Template do cloudformation mapeando todos os recursos necessários
  - Código da API escrito com Node.js

## Rotas esperadas

GET /produtos
GET /produtos?filter=NOME
POST /produtos
GET /produtos/:id
PUT /produtos/:id
DELETE /produtos/:id
GET /produtos
GET /produtos?filter=NOME
POST /produtos
GET /produtos/:id
PUT /produtos/:id
DELETE /produtos/:id
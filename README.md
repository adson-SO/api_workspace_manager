# API Workspace Manager 👔

> ⚠️ Developing

## Descrição

API REST com objetivo de gerenciar um negócio, permitindo cadastro de funcionários e produtos.

### Tecnologias e ferramentas 🧰

- NodeJS
- Typescript
- NestJS
- MySQL
- TypeORM

## Como rodar a aplicação ❓

### Pré-requisitos

Para rodar a aplicação você antes precisará instalar as seguintes ferramentas:

- [NodeJS](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/downloads/) (se preferir, você também pode usar o Docker para rodar uma imagem do banco)
- [Postman](https://www.postman.com) (uma recomendação para você testar as rotas)
- [VSCode](https://code.visualstudio.com/) (uma recomendação para você editar o código)
- [Git](https://git-scm.com/)

### Rodando a aplicação 💻

```bash
# Abra seu terminal e digite o seguinte comando para clonar o repositório:
$ git clone https://github.com/adson-SO/api_workspace_manager.git

# Acesse a pasta do projeto pelo VSCode

# Instale as dependências do projeto digitando o seguinte comando no terminal:
npm install

# Rode as migrations da aplicação digitando o seguinte comando no terminal:
npm run migration:run

# Execute a aplicação com o comando: 
npm run start
```

### Testando os endpoints 👨‍💻

Você pode testar os endpoints através do Postman.

### Endpoint para cadastrar um funcionário:
> POST - `http://localhost:3000/api/v1/employee`

Exemplo de payload:

```json
{
    "name": "Ricardo Oliveira",
    "cpf": "18463838030",
    "office": "vendedor",
    "birthday": "05/17/1994"
}
```
(Observação: por enquanto a aplicação aceita datas apenas no formato MM/DD/YYYY)

Exemplo de resposta:

```json
{
    "employee_id": 1,
    "name": "Ricardo Oliveira",
    "cpf": "184.638.380-30",
    "office": "vendedor",
    "birthday": "1994-05-17T03:00:00.000Z",
    "situation": "activate"
}
```

### Endpoint para listar todos os funcionários cadastrados:
> GET - `http://localhost:3000/api/v1/employee`

Exemplo de resposta:

```json
[
    {
        "employee_id": 1,
        "name": "Pedro Sousa",
        "cpf": "879.390.900-46",
        "office": "vendedor",
        "birthday": "2002-08-30T03:00:00.000Z",
        "situation": "activate"
    },
    {
        "employee_id": 2,
        "name": "Ricardo Oliveira",
        "cpf": "184.638.380-30",
        "office": "vendedor",
        "birthday": "1994-05-17T03:00:00.000Z",
        "situation": "activate"
    }
]
```

Este endpoint também permite a busca por nome, cpf, função, data de nascimento e situação, através de query params. 

Exemplos de busca por query params:

```bash
http://localhost:3000/api/v1/employee?name=Sousa

http://localhost:3000/api/v1/employee?cpf=18463838030
```

### Endpoint para buscar um funcionário pelo id:
> GET - `http://localhost:3000/api/v1/employee/:id`

Exemplo de resposta:

```json
{
    "employee_id": 5,
    "name": "Ricardo Oliveira",
    "cpf": "184.638.380-30",
    "office": "vendedor",
    "birthday": "1994-05-17T03:00:00.000Z",
    "situation": "activate"
}
```

### Endpoint para atualizar os dados de um funcionário:
> PUT - `http://localhost:3000/api/v1/employee/:id`

Exemplo de payload:

```json
{
    "situation": "deactivate"
}
```
(Observação: por enquanto a aplicação aceita datas apenas no formato MM/DD/YYYY)

Exemplo de resposta:

```json
{
    "employee_id": 5,
    "name": "Ricardo Oliveira",
    "cpf": "184.638.380-30",
    "office": "vendedor",
    "birthday": "1994-05-17T03:00:00.000Z",
    "situation": "deactivate"
}
```

### Endpoint para deletar um funcionário pelo id:
> DELETE - `http://localhost:3000/api/v1/employee/:id`

Se a operação for bem sucedida o corpo da resposta estará vazio.

### Endpoint para cadastrar um produto:
> POST - `http://localhost:3000/api/v1/product`

Exemplo de payload:

```json
{
    "name": "notebook lenovo",
    "category": "eletronico",
    "price": 12.32,
    "employee_id": 2
}
```

Exemplo de resposta:

```json
{
    "product_id": 5,
    "name": "notebook lenovo",
    "category": "eletronico",
    "price": 12.32,
    "employee_id": 2
}
```

### Endpoint para listar todos os produtos cadastrados:
> GET - `http://localhost:3000/api/v1/product`

Exemplo de resposta:

```json
[
    {
        "product_id": 1,
        "name": "notebook dell",
        "category": "eletronico",
        "price": 12.32,
        "employee_id": 2
    },
    {
        "product_id": 4,
        "name": "notebook lenovo",
        "category": "eletronico",
        "price": 12.32,
        "employee_id": 2
    }
]
```

Este endpoint também permite a busca por nome, categoria, preço e id do funcionário, através de query params. 

Exemplos de busca por query params:

```bash
http://localhost:3000/api/v1/employee?name=notebook+lenovo

http://localhost:3000/api/v1/employee?category=eletronico
```

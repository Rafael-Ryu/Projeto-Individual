# ReservaFácil

Este projeto é uma aplicação web, utilizando Node.js, seguindo o padrão MVC (Model-View-Controller) e utilizando PostgreSQL como banco de dados.

## Requisitos

- Node.js (versão X.X.X)
- PostgreSQL (versão X.X.X)

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/Rafael-Ryu/ReservaFacil.git
   cd ReservaFacil
```

2. **Instalar as dependências:**
    
```bash
npm install
```
    
3. **Configurar o arquivo `.env`:**
    
Renomeie o arquivo `.env.example` para `.env` (se existir, caso contrário, crie um) e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL. Exemplo:
```
DB_USER=Usuario
DB_HOST=Endereço da Host
DB_DATABASE=Nome da Database
DB_PASSWORD=Senha
DB_PORT=Porta utilizada
DB_SSL=True
PORT=3000
```
    

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Funcionalidades
---------------

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.
* **API RESTful:** Endpoints para gerenciamento de usuários (CRUD).
* **Testes:** Inclui estrutura básica para testes automatizados com Jest e Supertest.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.
* `npm run init-db`: Executa o script [scripts/runSQLScript.js](scripts/runSQLScript.js) para inicializar o banco de dados com a tabela `users` e dados iniciais definidos em [scripts/init.sql](scripts/init.sql).

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados ([config/db.js](config/db.js)).
* **`controllers/`**: Controladores da aplicação (ex: [controllers/userController.js](controllers/userController.js)).
* **`models/`**: Modelos da aplicação (ex: [models/userModel.js](models/userModel.js)).
* **`routes/`**: Rotas da aplicação (ex: [routes/userRoutes.js](routes/userRoutes.js), [routes/frontRoutes.js](routes/frontRoutes.js)).
* **`services/`**: Lógica de serviço (ex: [services/userService.js](services/userService.js)).
* **`scripts/`**: Scripts auxiliares (ex: [scripts/init.sql](scripts/init.sql), [scripts/runSQLScript.js](scripts/runSQLScript.js)).
* **`tests/`**: Testes automatizados (ex: [tests/userController.test.js](tests/userController.test.js)).
* **`views/`**: Arquivos de template EJS para o frontend.
    * **`components/`**: Componentes reutilizáveis (ex: [views/components/header.ejs](views/components/header.ejs)).
    * **`css/`**: Arquivos de estilo (ex: [views/css/style.css](views/css/style.css)).
    * **`layout/`**: Layout principal da aplicação (ex: [views/layout/main.ejs](views/layout/main.ejs)).
    * **`pages/`**: Páginas específicas da aplicação (ex: [views/pages/page1.ejs](views/pages/page1.ejs)).
* **`assets/`**: Arquivos estáticos como imagens.
* **`server.js`**: Ponto de entrada da aplicação ([server.js](server.js)).
* **`package.json`**: Metadados do projeto e dependências ([package.json](package.json)).
* **`jest.config.js`**: Configuração do Jest ([jest.config.js](jest.config.js)).
* **`.env`**: Arquivo para variáveis de ambiente.
* **`PI-WAD.md`**: Documento da Aplicação Web ([PI-WAD.md](PI-WAD.md)).

Licença
-------

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Rafael-Ryu/Projeto-Individual">ReservaFácil</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Rafael-Ryu">Inteli, Rafael Ryu Tati Nakahara</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></p>
# Projeto Store Manager

Esta API foi desenvolvida seguindo a arquitetura em camadas, garantindo uma estruturação clara e modularizada do código. O objetivo principal da aplicação é fornecer uma solução robusta para o gerenciamento de vendas, permitindo a criação, visualização, atualização e exclusão de produtos e registros de vendas.

Características Principais:
- Arquitetura em Camadas: A aplicação foi projetada com uma separação clara entre lógica de negócios, acesso a dados e interface da API, promovendo uma melhor organização e manutenção do código.

- Gerenciamento de Produtos: Os usuários podem facilmente adicionar, visualizar, atualizar e deletar produtos, garantindo um controle eficiente do inventário.

- Gerenciamento de Vendas: Além do gerenciamento de produtos, a API permite o registro e gestão de vendas, proporcionando uma visão abrangente das transações realizadas.

- Banco de Dados MySQL: A persistência dos dados é assegurada através do uso do MySQL.

- Testes: Para garantir a integridade e funcionalidade da API, foram desenvolvidos testes que cobrem as principais operações.

## Tecnologias, ferramentas e habilidades
- Docker
- MySQL
- Node.js
- Express
- API e banco de dados
- Arquitetura em camadas
- Mocha, Chai e Sinon (testes)

 ## Como executar o projeto

<br/>

```bash
# Clone ou baixe o repositório
git clone git@github.com:LarissaSimoes/project_store_manager.git
# Entre no diretório
cd project_store_manager
# Instale as dependências
npm install
# Inicie o Docker Compose executando o seguinte comando no diretório backend
docker-compose up -d
# Para executar os testes e saber a cobertura de testes, execute os seguintes comandos no terminal onde o container foi inicializado
npm run test:mocha
npm run test:coverage
```

<br /><hr /><br />

<p align='center'>
  Desenvolvido por <b>Larissa Simões</b>
  <br/><br/>

  <a href="https://www.linkedin.com/in/dev-larissa-carneiro-simoes/">
    <img alt="linkedIn" height="30px" src="https://i.imgur.com/TQRXxhT.png" />
  </a>
  &nbsp;&nbsp;
</p>

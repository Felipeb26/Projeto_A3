# Projeto_A3
Essa aplicação web tem como objetivo expor endpoints para o acesso do usuário do sistema de clínicas médicas 

# Componentes do Grupo
| Nome completo | RA        |
|---|-----------|
| Aline Sousa Lima | 819214026 | 
| Felipe Batista da Silva | 821244065 |
| Gabriela Nunes Barbosa | 821140737 |
| Guilherme Augusto Mota Barbosa | 821224564 |

# Pre-requisitos para instalação da aplicação.
Seguem os links para instalação dos softwares iniciais. Seguir as configurações relevantes de acordo com o seu sistema operacional que cada fabricante exige. Desconsiderar caso a instalação de algum ou mais deles já tenha sido feita. 
- Instalar o Git. Link [download e instalação](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Instalar o NodeJS e npm. Link [download e passos para instalação](https://nodejs.org/en/download/).
- Instalar o Yarn. Linbk [download e instalação](https://classic.yarnpkg.com/en/docs/install)
- Instalar o Swiper para o carrossel [documentação](https://swiperjs.com/angular)

# Build da aplicação
A partir da linha de comando ou prompt do seu sistema operacional, defina ou crie um diretório para efetuar o download da aplicação. Exemplo (repos): 
```
mkdir repos
```
Entre no seu diretório que você definiu ou conforme o exemplo digite o comando abaixo para entrar no diretório:
```
cd repos
``` 
Faça o clone do repositório com o comando git
```
git clone https://github.com/Felipeb26/Projeto_A3.git
```

# Execução da aplicação
A partir do diretório que foi efetuado o clone (ou seja, o repos ou o diretório que você definiu) digite os comandos a seguir para efetuar download das dependencias e compilação da aplicação:
```
cd Projeto_A3/BACK_FIREBASE/
yarn
cd ../Gateway/
yarn
cd ..
yarn start
```
Em caso de sucesso das execuções descritas a seguinte tela será apresentada

![console-server-started.jpeg](console-server-started.jpeg)
# Endpoints da aplicação
Segue a documentação de contratos que a interface do usuário possa acessar os endpoints definidos para as funcionalidades em questão [Swagger](http://localhost:3001/index)

# Primeiro microserviço Através do Barramento

| endpoint gateway| endpoint | method | info|
|----------|---------|------|------|
| <http://localhost:3001/crud/login>      |<http://localhost:3000/login> | POST | enviar email e senha para receber Bearer token para ter acesso aos demais endpoints. |
| <http://localhost:3001/crud/users>      |<http://localhost:3000/user/{id}> | GET | retorna todos os usuarios do cadastrados.|
| <http://localhost:3001/crud/users>      |<http://localhost:3000/user/{id}> | POST | Salva usuario sendo necessario nome email senha e role |
|<http://localhost:3001/crud/users-page> | <http://localhost:3000/users-page> | GET | retorna todos os usuarios paginado.|
| <http://localhost:3001/crud//users-page>|<http://localhost:3000/user/{id}> | GET | retorna usuario de forma paginada para maior eficiencia em relação ao banco de dados.|
| <http://localhost:3001/crud/user/{id}>  |<http://localhost:3000/user/{id}> | GET | recebe como paraetro o id do usuario para localizar.|
| <http://localhost:3001/crud/user/{id}>       |<http://localhost:3000/user/{id}> | PUT | recebe o id para localizar o usuario e o corpo de acordo com os parametros para serem alterados.|
| <http://localhost:3001/crud/user/{id}>       |<http://localhost:3000/user/{id}>  | DELETE | receb o id do usuario afim de excluir ele do banco de dados.|

# Segundo microserviço Através do Barramento!

| endpoint gateway| endpoint | method | info|
|----------|---------|--------|---------|
| <http://localhost:3001/mail/> | <http://localhost:3003/index> | POST | envia um email de acordo com o modelo de email informado sendo necessario para quem será enviado o email o assunto e mensagem.|
| <http://localhost:3001/mail/> | <http://localhost:3003/index> | GET | realiza o dowload do modelo de email localmente, caso utilizado pelo gateway será retornado array de bytes.|

Para rodar o docker-compose.yml usar comando - "docker-compose up --build"
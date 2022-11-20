# Projeto_A3
Essa aplicação web tem como objetivo expor endpoints para o acesso do usuário do sistema de clínicas médicas 

# Componentes do Grupo
| Nome completo | RA        |
|---|-----------|
| Aline Sousa Lima | 819214026 | 
| Felipe Batista da Silva | 821244065 |
| Gabriela Nunes Barbosa | 821140737 |

# Apresentação
[Clique aqui para visualizar o vídeo de apresentação](https://youtu.be/2VI4KMAHwl4)

# Pre-requisitos para instalação da aplicação.
Seguem os links para instalação dos softwares iniciais. Seguir as configurações relevantes de acordo com o seu sistema operacional que cada fabricante exige. Desconsiderar caso a instalação de algum ou mais deles já tenha sido feita. 
- Instalar o Git. Link [download e instalação](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Instalar o NodeJS e npm. Link [download e passos para instalação](https://nodejs.org/en/download/).
- Instalar o Yarn. Link [download e instalação](https://classic.yarnpkg.com/en/docs/install)
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
npm i -g yarn
npm i -g @angular/cli@14
cd Projeto_A3
yarn ou npm install
em cada subpasta do repositorio Projeto_A3 deverá 
ser feito o comando yarn ou npm install para instalar
as dependecias necessarias de cada projeto
```
Em caso de sucesso das execuções descritas a seguinte tela será apresentada

![console-server-started.jpeg](console-server-started.jpeg)
# Endpoints da aplicação
Segue a documentação de contratos que a interface do usuário possa acessar os endpoints definidos para as funcionalidades em questão [Swagger](http://localhost:3001/index)

# Primeiro microserviço Através do Barramento

| endpoint gateway| endpoint | method | info|
|----------|---------|------|------|
| <http://localhost:3001/crud/login>      |<http://localhost:3000/login> | POST | Envia e-mail e senha para receber Bearer token para ter acesso aos demais endpoints. |
| <http://localhost:3001/crud/consultas>      |<http://localhost:3000/consultas> | GET | retorna todos os dados das consultas relacionadas ao medico e paciente cadastrados.|
| <http://localhost:3001/crud/docs>      |<http://localhost:3000/docs> | GET | Retorna todos os médicos cadastrados.|
| <http://localhost:3001/crud/users>      |<http://localhost:3000/users> | GET | Retorna todos os usuários cadastrados.|
| <http://localhost:3001/crud/users>      |<http://localhost:3000/users> | POST | Salva o usuário sendo necessario nome, e-mail, telefone, senha e role |
|<http://localhost:3001/crud/users-page> | <http://localhost:3000/users-page> | GET | Retorna todos os usuários paginando.|
| <http://localhost:3001/crud/user/{id}>  |<http://localhost:3000/user/{id}> | GET | Recebe como parâmetro o id do usuário para localizar.|
| <http://localhost:3001/crud/user/{id}>       |<http://localhost:3000/user/{id}> | PUT | Recebe o id para localizar o usuário e o corpo de acordo com os parâmetros para serem alterados.|
| <http://localhost:3001/crud/user/{id}>       |<http://localhost:3000/user/{id}>  | DELETE | Recebe o id do usuário afim de excluí-lo do banco de dados.|

# Segundo microserviço Através do Barramento!

| endpoint gateway| endpoint | method | info|
|----------|---------|--------|---------|
| <http://localhost:3001/mail/bem-user> | <http://localhost:3003/bem-user> | POST | Envia o e-mail para o usuário dando boas-vindas pelo cadastro na plataforma.|
| <http://localhost:3001/mail/bem-doc> | <http://localhost:3003/bem-doc> | POST | Envia o e-mail para o médico dando boas-vindas pelo cadastro na plataforma.|
| <http://localhost:3001/mail/preview> | <http://localhost:3003/preview> | POST | Recebe array de bytes para uso de download ou preview do pdf sendo obrigatório enviar o modelo do arquivo.|
| <http://localhost:3001/mail/medicamento> | <http://localhost:3003/medicamento> | POST | Envia um e-mail com o pdf de todos os medicamentos para serem utilizados pelo paciente .|
| <http://localhost:3001/mail/atestado> | <http://localhost:3003/atestado> | POST | Envia um e-mail com o pdf do atestado de saúde referente ao paciente.|

Para rodar o docker-compose.yml usar comando - "docker-compose up --build"

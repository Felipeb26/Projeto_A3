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
Segue a documentação de contratos que a interface do usuário possa acessar os endpoints definidos para as funcionalidades em questão [Swagger](http://localhost:3000/api-docs/) 

Para rodar o docker-compose.yml usar comando - "docker-compose up --build"
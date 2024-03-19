# ENTERness processo seletivo

## Como Acessar

Para acessar a aplicação é necessário clonar o repositório
`git clone git@github.com:EmmanuelRBoo/enterness.git`

Acessar o arquivo
`cd enterness`

Iniciar o build do docker
`docker-compose up --build`

Após finalizar o build das imagens já pode acessar a aplicação [neste link](http://localhost:8084) ou acessar manualmente: `http://localhost:8084`

Como o propósito é testar a funcionalidade do chat não fiz requisições autenticadas mas caso necessário poderia ser autenticado com jsonwebtoken, bearer token ou OAuth2.

Deixei o arquivo .env disponível por não ter hospedado a aplicação,
o banco de dados usado é posgresql por ser o mais parecido com mysql com hospedagem gratis no [supabase](https://supabase.com/)

As aplicações foram iniciadas com [yarn](https://yarnpkg.com/) por fazer os downloads dos pacotes mais rápido que o npm.

### Front-end

No front-end foi usado [vite.js](https://vitejs.dev/) pelo fato da pŕopria documentação do [react](https://react.dev/) recomenda.

Por ser um app bem pequeno não achei necessário utilizar uma biblioteca de rotas para não aumentar a complexidade desnecessariamente.

Usei [tailwindCss](https://tailwindcss.com/) como framework de estilização por sei mais acostumado mas nada impede de refazer com css, scss, sass, less ou styled-components.

A arquitetura está bem básica, separada por alguns componentes principais e arquivos chaves.

### Back-end

No back-end foi foi usado o framework [express](https://expressjs.com/pt-br/), o projeto inicial era em nest.js mas resolvi refatorar por ser um framework que eu sou mais familiarizado.

Usei [prisma](https://www.prisma.io/) como ORM pois ele combina muito bem com a programação funcional. O prisma anula a necessidade da camada de models pois os models são criados no arquivo schema.prisma, cada model faz referência a uma tabela do banco de dados com configurações personalizadas oferecidas pelo prisma.

Na construção da arquitetura usei os principios S.O.L.I.D (apenas as siglas que não se referenciam diretamente a classes) e padrões REST, utilizei funções para criar as apis por ser mais rápido para compilar que classes.

O Cors está fixado para as urls acima, caso queira usar outra url será necessário mudar manualmente e refazer o build das imagens

Por se tratar de uma aplicação teste e não ter hospedagem, algumas chaves secretas estão sendo utilizadas hardcoded.
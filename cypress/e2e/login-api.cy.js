/*
Para melhorar a visualização dos testes de api
utilizei um plugin/biblioteca do cypress
npm i cypress-plugin-api
Depois adicione o import 'cypress-plugin-api' no arquivo
support/e2e.js
Para não precisar add o requestMode em cada requisição,
crie um arquivo cypress.ev.json e adicione ou em cypress.config.js 
adicione em env: {requestMode: true}
*/
describe('Testes em api', () => {
    context('Testes em roas com usuário autorizado', () => {
        beforeEach(() => {
            cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
        })

        it('GET via url front para teste em resposta da home', () => {
            cy.request("GET", "/").should((response) => {
                expect(response.status).to.eq(200);
            });
        });

        it('Deve retornar token de autenticação', () => {
            cy.get('@token').should('exist');
        })
    });

    context('Requisições de usuário clínica em especialistas', () => {
        beforeEach(() => {
            cy.fixture('especialistas.json').as('especialistas')
            cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
        })

        it.only('POST em especialistas', () => {
            cy.get('@especialistas').then((dados) => {
                const especialista = dados.especialistas[0];
                cy.request({
                    method: 'POST',
                    url: Cypress.env('api_clinica'),
                    body: {
                        nome: especialista.nome,
                        email: especialista.email,
                        senha: especialista.senha,
                        endereco: {
                            cep: especialista.cep,
                            rua: especialista.rua,
                            numero: especialista.numero,
                            complemento: especialista.complemento,
                            estado: especialista.estado
                        }
                    },

                }).then((response) => {
                    if (response.status !== 201) {
                        cy.log(`O status ${response.status} não é o padrão 201`)
                    }

                    expect(response.body).to.have.property('id') // Verifica se a resposta possui a propriedade "id"
                    expect(response.body).to.have.property('nome')
                    expect(response.body).to.have.property('email') // Verifica se a propriedade "email" é igual ao valor enviado na requisição
                })
            })
        })
    });
});

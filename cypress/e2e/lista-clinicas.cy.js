describe('Teste de requisição da API para listar clínicas', () => {
    it('Deve retornar uma lista de clínicas', () => {
        cy.request('GET', Cypress.env('api_clinica'))
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
            });
    });
});
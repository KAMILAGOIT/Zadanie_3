describe('HTTPBin API Tests', () => {
    const baseUrl = 'https://httpbin.org';

    it('GET request with query parameters', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/get`,
            qs: { test: 'value' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.args.test).to.eq('value');
        });
    });

    it('POST request with JSON body', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/post`,
            body: { name: 'John', age: 30 },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.json.name).to.eq('John');
            expect(response.body.json.age).to.eq(30);
        });
    });

    it('PUT request with form data', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/put`,
            form: true,
            body: { field1: 'value1', field2: 'value2' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.form.field1).to.eq('value1');
            expect(response.body.form.field2).to.eq('value2');
        });
    });

    it('DELETE request', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/delete`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('GET request with custom headers', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/headers`,
            failOnStatusCode: false, // Ignoruj błędy statusu
            headers: {
                'User-Agent': 'Cypress Test Agent',
                'Custom-Header': 'CustomValue'
            }
        }).then((response) => {
            if (response.status === 200) {
                expect(response.body.headers['User-Agent']).to.eq('Cypress Test Agent');
                expect(response.body.headers['Custom-Header']).to.eq('CustomValue');
            } else {
                cy.log('Server responded with status: ' + response.status);
            }
        });
    });

    it('POST request with URL encoded form data', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/post`,
            form: true,
            body: { key1: 'value1', key2: 'value2' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.form.key1).to.eq('value1');
            expect(response.body.form.key2).to.eq('value2');
        });
    });

    it('GET request with delay', () => {
        const startTime = new Date().getTime();
        cy.request({
            method: 'GET',
            url: `${baseUrl}/delay/2`
        }).then((response) => {
            const endTime = new Date().getTime();
            const duration = endTime - startTime;
            expect(response.status).to.eq(200);
            expect(duration).to.be.gte(2000);
        });
    });

    it('GET request with basic auth', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/basic-auth/user/pass`,
            auth: {
                user: 'user',
                pass: 'pass'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.authenticated).to.be.true;
        });
    });

    it('GET request for JSON response', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/json`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('slideshow');
        });
    });

    it('GET request for IP', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/ip`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('origin');
        });
    });
});
/**
 * @description User Login Tests
 * @author Mateus Rachadel Lohn
 */
describe('Login tests', () => {
  describe('Login - Authentication', () => {

    beforeEach(() => {
      cy.visit('https://front.serverest.dev/login')
    })

    it('Should login successfully', () => {
      cy.get('[data-testid="email"]').type('mateus123lohn@gmail.com')
      cy.get('[data-testid="senha"]').type('123123')
      cy.get('[data-testid="entrar"]').click()

      cy.url().should('include', '/home')
    })

    it('Should not login with invalid credentials', () => {
      cy.get('[data-testid="email"]').type('mateus123lohn@gmail.com')
      cy.get('[data-testid="senha"]').type('123')
      cy.get('[data-testid="entrar"]').click()

      cy.contains('Email e/ou senha inválidos').should('be.visible')
    })

    it('Should not login with empty email', () => {
      cy.get('[data-testid="senha"]').type('12345')
      cy.get('[data-testid="entrar"]').click()

      cy.contains('Email é obrigatório').should('be.visible')
    })

    it('Should not login with empty password', () => {
      cy.get('[data-testid="email"]').type('mateus123lohn@gmail.com')
      cy.get('[data-testid="entrar"]').click()

      cy.contains('Password é obrigatório').should('be.visible')
    })

    it('Should not login with empty credentials', () => {
      cy.get('[data-testid="entrar"]').click()

      cy.contains('Email é obrigatório').should('be.visible')
      cy.contains('Password é obrigatório').should('be.visible')
    })

  })
  describe('Validation', () => {
    beforeEach(() => {
      cy.visit('https://front.serverest.dev/login')
    })

    it('Should login when pressing Enter', () => {
      cy.get('[data-testid="email"]').type('mateus123lohn@gmail.com')
      cy.get('[data-testid="senha"]').type('123123{enter}')

      cy.url().should('include', '/home')
    })

    it('Should keep fields filled after login error', () => {
      cy.get('[data-testid="email"]').type('user@test.com')
      cy.get('[data-testid="senha"]').type('wrongpassword')
      cy.get('[data-testid="entrar"]').click()

      cy.contains('Email e/ou senha inválidos').should('be.visible')

      cy.get('[data-testid="email"]').should('have.value', 'user@test.com')
      cy.get('[data-testid="senha"]').should('have.value', 'wrongpassword')
    })

    it('Should allow clearing fields after error', () => {
      cy.get('[data-testid="email"]').type('user@test.com')
      cy.get('[data-testid="senha"]').type('wrongpassword')
      cy.get('[data-testid="entrar"]').click()

      cy.get('[data-testid="email"]').clear().should('have.value', '')
      cy.get('[data-testid="senha"]').clear().should('have.value', '')
    })

    it('Should mark email field as invalid without @', () => {
      cy.get('[data-testid="email"]').type('usuarioemail.com')
      cy.get('[data-testid="senha"]').type('123456')
      cy.get('[data-testid="entrar"]').click()

      cy.get('[data-testid="email"]:invalid').should('exist')
    })

    it('Should mark email field as invalid without domain', () => {
      cy.get('[data-testid="email"]').type('usuario@')
      cy.get('[data-testid="senha"]').type('123456')
      cy.get('[data-testid="entrar"]').click()

      cy.get('[data-testid="email"]:invalid').should('exist')
    })

  })
  describe('Registration - Security & Resilience', () => {
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="cadastrar"]').click()
  })

  it('Password field should be masked', () => {
    cy.get('[data-testid="password"]')
      .should('have.attr', 'type', 'password')
  })

  it('Admin checkbox should be unchecked by default', () => {
    cy.get('[data-testid="checkbox"]').should('not.be.checked')
  })

  it('Error messages should be generic and not expose system details', () => {
    cy.get('[data-testid="nome"]').type('Usuário Teste')
    cy.get('[data-testid="email"]').type('email@teste.com')
    cy.get('[data-testid="password"]').type('12')
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Exception').should('not.exist')
    cy.contains('SQL').should('not.exist')
    cy.contains('NullPointer').should('not.exist')
  })

})

})

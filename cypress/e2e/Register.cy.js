/**
 * @description User Registration Tests
 * @author Mateus Rachadel Lohn
 */
describe('Registration Tests', () => {
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="cadastrar"]').click()
  })

  describe('Happy Path', () => {

    it('Should register a regular user', () => {
      const user = {
        nome: 'Usuário Comum',
        email: `user${Date.now()}@test.com`,
        password: '123456'
      }

      cy.get('[data-testid="nome"]').type(user.nome)
      cy.get('[data-testid="email"]').type(user.email)
      cy.get('[data-testid="password"]').type(user.password)
      cy.get('[data-testid="cadastrar"]').click()

      cy.contains('Cadastro realizado com sucesso').should('be.visible')
    })

    it('Should register user with full name (composed name)', () => {
      const user = {
        nome: 'Mateus Rachadel Lohn',
        email: `user${Date.now()}@test.com`,
        password: '123'
      }

      cy.get('[data-testid="nome"]').type(user.nome)
      cy.get('[data-testid="email"]').type(user.email)
      cy.get('[data-testid="password"]').type(user.password)
      cy.get('[data-testid="cadastrar"]').click()

      cy.contains('Cadastro realizado com sucesso').should('be.visible')
    })

  })

  describe('User Roles', () => {
    it('Should register an admin user', () => {
      const admin = {
        nome: 'Usuário Admin',
        email: `admin${Date.now()}@test.com`,
        password: '123456'
      }

      cy.get('[data-testid="nome"]').type(admin.nome)
      cy.get('[data-testid="email"]').type(admin.email)
      cy.get('[data-testid="password"]').type(admin.password)
      cy.get('[data-testid="checkbox"]').check()
      cy.get('[data-testid="cadastrar"]').click()

      cy.contains('Cadastro realizado com sucesso').should('be.visible')
    })

  })

  describe('Validations', () => {

    it('Should not register without name', () => {
      cy.get('[data-testid="email"]').type(`user${Date.now()}@test.com`)
      cy.get('[data-testid="password"]').type('123456')
      cy.get('[data-testid="cadastrar"]').click()

      cy.contains('Nome é obrigatório').should('be.visible')
    })

    it('Should not register without email', () => {
      cy.get('[data-testid="nome"]').type('Usuário Teste')
      cy.get('[data-testid="password"]').type('123456')
      cy.get('[data-testid="cadastrar"]').click()

      cy.contains('Email é obrigatório').should('be.visible')
    })

    it('Should not register without password', () => {
      cy.get('[data-testid="nome"]').type('Usuário Teste')
      cy.get('[data-testid="email"]').type(`user${Date.now()}@test.com`)
      cy.get('[data-testid="cadastrar"]').click()

      cy.contains('Password é obrigatório').should('be.visible')
    })

    it('Should not register with invalid email (missing @)', () => {
      cy.get('[data-testid="nome"]').type('Usuário Teste')
      cy.get('[data-testid="email"]').type('usuarioteste.com')
      cy.get('[data-testid="password"]').type('123456')
      cy.get('[data-testid="cadastrar"]').click()

      cy.get('[data-testid="email"]:invalid').should('exist')
    })

    it('Should not register with invalid email (missing domain)', () => {
      cy.get('[data-testid="nome"]').type('Usuário Teste')
      cy.get('[data-testid="email"]').type('usuario@')
      cy.get('[data-testid="password"]').type('123456')
      cy.get('[data-testid="cadastrar"]').click()

      cy.get('[data-testid="email"]:invalid').should('exist')
    })

    it('Should keep fields filled after registration error', () => {
      cy.get('[data-testid="nome"]').type('Usuário Teste')
      cy.get('[data-testid="email"]').type('emailinvalido')
      cy.get('[data-testid="password"]').type('123456')
      cy.get('[data-testid="cadastrar"]').click()

      cy.get('[data-testid="nome"]').should('have.value', 'Usuário Teste')
    })

    it('Should allow clearing fields manually', () => {
      cy.get('[data-testid="nome"]').type('Usuário Teste').clear().should('have.value', '')
      cy.get('[data-testid="email"]').type('user@test.com').clear().should('have.value', '')
      cy.get('[data-testid="password"]').type('123456').clear().should('have.value', '')
    })

  })

  describe('Security', () => {

    it('Password field should be masked', () => {
      cy.get('[data-testid="password"]').should('have.attr', 'type', 'password')
    })

    it('Password should remain masked while typing', () => {
      cy.get('[data-testid="password"]').type('123456')
      cy.get('[data-testid="password"]').should('have.attr', 'type', 'password')
    })

    it('Admin checkbox should be unchecked by default', () => {
      cy.get('[data-testid="checkbox"]').should('not.be.checked')
    })

    it('Error messages should not expose internal system details', () => {
      cy.get('[data-testid="nome"]').type('Usuário Teste')
      cy.get('[data-testid="email"]').type('email@teste.com')
      cy.get('[data-testid="password"]').type('123')
      cy.get('[data-testid="cadastrar"]').click()

      cy.contains('stack').should('not.exist')
      cy.contains('Exception').should('not.exist')
    })
  })
})

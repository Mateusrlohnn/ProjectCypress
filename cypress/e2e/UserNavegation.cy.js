/**
 * @description User Usability Tests
 * @author Mateus Rachadel Lohn
 */
describe('User Navigation', () => {

  const EMAIL = 'mateus123lohn@gmail.com'
  const SENHA = '123123'

  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')

    cy.get('[data-testid="email"]').type(EMAIL)
    cy.get('[data-testid="senha"]').type(SENHA)
    cy.get('[data-testid="entrar"]').click()

    cy.url().should('include', '/home')
  })

  it('Should test main menu navigation', () => {
    const menuLinks = [
      { name: 'Home', testid: 'home', url: '/home' },
      { name: 'Produtos', testid: 'minhaListaDeProdutos', url: '/minhaListaDeProdutos' },
      { name: 'Carrinho', testid: 'carrinho', url: '/carrinho' },
    ]
  })

  it('Should logout successfully and redirect to login page', () => {
    cy.get('[data-testid="logout"]').should('be.visible').click()
    cy.url().should('include', '/login')
    cy.contains('Login').should('be.visible')
  })

  it('Should open a products details page and return to the home page', () => {
    cy.get('a[href^="/detalhesProduto/"]').first().should('be.visible').click()

    cy.url().should('include', '/detalhesProduto/')

    cy.get('[data-testid="voltarHome"]').should('be.visible').click()

    cy.url().should('include', '/home')
  })

  it('Should navigate between shopping list, cart and home pages', () => {
    cy.visit('https://front.serverest.dev/minhaListaDeProdutos')
    cy.url().should('include', '/minhaListaDeProdutos')

    cy.visit('https://front.serverest.dev/carrinho')
    cy.url().should('include', '/carrinho')

    cy.visit('https://front.serverest.dev/home')
    cy.url().should('include', '/home')

    cy.visit('https://front.serverest.dev/minhaListaDeProdutos')
    cy.url().should('include', '/minhaListaDeProdutos')

    cy.visit('https://front.serverest.dev/carrinho')
    cy.url().should('include', '/carrinho')

    cy.visit('https://front.serverest.dev/home')
    cy.url().should('include', '/home')
  })

  it('Should allow typing and searching without breaking the UI', () => {
    cy.get('[data-testid="pesquisar"]').should('be.visible').type('test')

    cy.get('[data-testid="botaoPesquisar"]').click()

    cy.url().should('include', '/home')
  })

  it('Should show no results message when searching for a non-existing product', () => {
    cy.get('[data-testid="pesquisar"]').type('produtoInexistente123')

    cy.get('[data-testid="botaoPesquisar"]').click()

    cy.contains('Nenhum produto foi encontrado').should('be.visible')
  })

  it('Should log in and add a random product to the cart', () => {
    cy.get('a[href^="/detalhesProduto/"]').should('have.length.greaterThan', 0)
      .then(($links) => {
        const randomIndex = Math.floor(Math.random() * $links.length)
        cy.wrap($links[randomIndex]).click()
      })

    cy.url().should('include', '/detalhesProduto/')

    cy.get('[data-testid="adicionarNaLista"]', { timeout: 10000 }).should('be.visible').click()

    cy.get('[data-testid="adicionar carrinho"]').should('be.visible').click()

    cy.url().should('include', '/carrinho')
  })

  it('Should add a random product to the shopping list and then clear the list', () => {
    cy.get('a[href^="/detalhesProduto/"]')
      .should('have.length.greaterThan', 0)
      .then(($links) => {
        const randomIndex = Math.floor(Math.random() * $links.length)
        cy.wrap($links[randomIndex]).click()
      })

    cy.url().should('include', '/detalhesProduto/')

    cy.get('[data-testid="adicionarNaLista"]').should('be.visible').click()

    cy.url().should('include', '/minhaListaDeProdutos')

    cy.get('[data-testid="shopping-cart-product-name"]').should('have.length.greaterThan', 0)

    cy.get('[data-testid="limparLista"]').should('be.visible').click()

    cy.contains('Seu carrinho está vazio').should('be.visible')
  })
})

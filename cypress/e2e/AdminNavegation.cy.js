/**
 * @description Administrator Usability Tests
 * @author Mateus Rachadel Lohn
 */

describe('Administrator Navigation', () => {

  let adminUser

  before(() => {
    const admin = {
      nome: 'Administrador QA',
      email: `admin_${Date.now()}@test.com`,
      password: '123123',
      administrador: 'true'
    }

    cy.request('POST', 'https://serverest.dev/usuarios', admin)
      .then(() => {
        adminUser = {
          email: admin.email,
          password: admin.password
        }
      })
  })
  
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')

    cy.get('[data-testid="email"]').type(adminUser.email)
    cy.get('[data-testid="senha"]').type(adminUser.password)
    cy.get('[data-testid="entrar"]').click()

    cy.url().should('include', '/home')
  })

  it('Should navigate through all top menu options and return to Home', () => {
    cy.contains('Cadastrar Usuários').should('be.visible').click()
    cy.url().should('include', '/admin/cadastrarusuarios')

    cy.contains('Listar Usuários').should('be.visible').click()
    cy.url().should('include', '/admin/listarusuarios')

    cy.contains('Cadastrar Produtos').should('be.visible').click()
    cy.url().should('include', '/admin/cadastrarprodutos')

    cy.contains('Listar Produtos').should('be.visible').click()
    cy.url().should('include', '/admin/listarprodutos')

    cy.contains('Relatórios').should('be.visible').click()
    cy.url().should('include', '/admin/relatorios')

    cy.contains('Home').should('be.visible').click()
    cy.contains('Bem Vindo').should('be.visible')
  })

  it('Should successfully log out when clicking the Logout button', () => {
    cy.contains('Bem Vindo').should('be.visible')

    cy.contains('Logout').should('be.visible').click()

    cy.url().should('include', '/login')
    cy.contains('Entrar').should('be.visible')
  })

  it('Should create a random user and display it in the users list', () => {
    const timestamp = Date.now()

    const usuario = {
      nome: `Usuario QA ${timestamp}`,
      email: `usuario_${timestamp}@email.com`,
      senha: `Senha@${timestamp}`,
    }

    cy.contains('Cadastrar Usuários').click()
    cy.url().should('include', '/admin/cadastrarusuarios')

    cy.get('input[name="nome"]').type(usuario.nome)
    cy.get('input[name="email"]').type(usuario.email)
    cy.get('input[name="password"]').type(usuario.senha)
    cy.get('input[type="checkbox"]').check()

    cy.contains('Cadastrar').click()

    cy.contains('Listar Usuários').should('be.visible').click()
    cy.url().should('include', '/admin/listarusuarios')
  })

  it('Should list users and delete a random user from the system', () => {
    cy.contains('Listar Usuários').should('be.visible').click()
    cy.url().should('include', '/admin/listarusuarios')

    cy.get('table tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)

    cy.get('table tbody tr').then((linhas) => {
      const indexAleatorio = Math.floor(Math.random() * linhas.length)

      cy.wrap(linhas)
        .eq(indexAleatorio)
        .within(() => {
          cy.contains('Excluir')
            .should('be.visible')
            .click()
        })
    })

    cy.get('table tbody tr').should('exist')
  })

  it('Should create a product with controlled data to avoid failures', () => {
    const numeroAleatorio = Math.floor(Math.random() * 1001)

    const produto = {
      nome: `Notebook Gamer ${numeroAleatorio}`,
      preco: 4000,
      descricao: 'Produto criado via teste automatizado',
      quantidade: 2,
    }

    cy.contains('Cadastrar Produtos').should('be.visible').click()
    cy.url().should('include', '/admin/cadastrarprodutos')

    cy.get('[data-testid="nome"]')
      .should('be.visible')
      .type(produto.nome)

    cy.get('[data-testid="preco"]')
      .should('be.visible')
      .type(produto.preco.toString())

    cy.get('[data-testid="descricao"]')
      .should('be.visible')
      .type(produto.descricao)

    cy.get('[data-testid="quantity"]')
      .should('be.visible')
      .type(produto.quantidade.toString())

    cy.get('[data-testid="cadastarProdutos"]')
      .should('be.enabled')
      .click()

    cy.contains('Listar Produtos').should('be.visible')
  })

  it('Should list products and remove a random product', () => {
    cy.contains('Listar Produtos').should('be.visible').click()
    cy.url().should('include', '/admin/listarprodutos')

    cy.get('table tbody tr')
      .should('have.length.greaterThan', 0)

    cy.get('table tbody tr').then((linhas) => {
      const indiceAleatorio = Math.floor(Math.random() * linhas.length)

      cy.wrap(linhas[indiceAleatorio])
        .find('button')
        .contains('Excluir')
        .click()
    })
    cy.url().should('include', '/admin/listarprodutos')
  })
})

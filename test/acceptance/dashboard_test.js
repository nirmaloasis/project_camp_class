require('../helper')

const http = require('http')

var server

before(function() {
 server = http.createServer(require('../../app'))
 server.listen(0)
 browser.baseUrl = 'http://localhost:' + server.address().port
})

beforeEach(function(done) {
  done();
  return browser.ignoreSynchronization = true
})

afterEach(function(done) {
  done();
  return browser.ignoreSynchronization = true
})

after(function(){
  server.close()
})
describe('dashboard test', () => {
  it('Login ', () => {
    browser.get('/')
    element(by.id('username')).sendKeys('pankaj').then(() =>{
      element(by.id('password')).sendKeys('123').then(() =>{
        element(by.id('but')).click().then(() =>{
          element(by.css('h1')).getText().then((text) => {
            expect(text).to.equal('Carriers')
        })
      })
    })
  })
})
})

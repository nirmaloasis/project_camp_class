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


  describe('Given a browser', () => {
    describe('When I visit Login page', () => {
      it('Then I see a Login screen', () => {
        browser.get('/')
        element(by.css('h1')).getText().then((text) => {
          expect(text).to.equal('Agent')

        })

      })
    })
  })

  describe('Login Process in Agent Login', () => {
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
describe('Login Process in Agent Login without credentials' , () => {
  it('Login' , () => {
    browser.get('/')

        element(by.id('but')).click().then(()=>{
          element(by.id('error')).getText().then((text) => {
            expect(text).to.equal('Enter username !!!')
          })
        })
      })
})
describe('Login Process in Agent Login without password' , () => {
  it('Login' , () => {
    browser.get('/')
        element(by.id('username')).sendKeys('pankaj').then(() => {
          element(by.id('but')).click().then(()=>{
            element(by.id('error')).getText().then((text) => {
              expect(text).to.equal('Enter password !!!')
            })
          })
        })

      })
})
describe('Login Process in Agent Login with invalid credentials' , () => {
  it('Login' , () => {
    browser.get('/')
        element(by.id('username')).sendKeys('nirmal').then(() => {
          element(by.id('password')).sendKeys('1234').then(() => {
            element(by.id('but')).click().then(()=>{
              element(by.id('error')).getText().then((text) => {
                expect(text).to.equal('Invalid credentials')
              })
            })

          })

        })

      })
})

//   describe('has the functionality', () => {
//     it('to update the existing', () => {
//       browser.get('/albums')
//       element(by.id("vvk")).click().then(() => {
//         element(by.id("edit")).click().then(() => {
//           element(by.id('artist')).sendKeys('tArtist').then(() => {
//             element(by.id("album")).sendKeys('tAlbum').then(() => {
//               element(by.id("submit")).click().then(() => {
//                 element(by.css("h1")).getText().then((text) => {
//                   expect(text).to.equal('Albums')
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
//   afterEach(function() {
//     AlbumCollection.remove({}, (err,album) => done())
//   })
//
//   after(function(){
//     server.close()
//   })
//
// })

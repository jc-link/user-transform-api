const { expect } = require("chai")
const { UserService } = require("../services/userService")
const User = require("../models/User")
const rewire = require("rewire")
const sinon = require("sinon")

const mongoose = require('mongoose')

const sandbox = sinon.createSandbox()

let userService = rewire('../services/userService')

describe('UserService', () => {
    // before('Before', () => {
    //     console.log('Before all tests')
    // })
    // after('After', () => {
    //     console.log('After all tests')
    // })

    // beforeEach('Before each', () => {
    //     console.log('Before each test')
    // })
    // afterEach('After each', () => {
    //     console.log('After each test')
    // })

    describe('healthCheck sync', () => {
        it('should return "User service is working"', () => {
            const result = userService.healthCheck()
            expect(result).to.equal('User service is working')
        })
    })

    describe('healthCheck async', () => {
        it('should return "User service is working"', async () => {
            const result = await userService.healthCheckAsync()
            .then(result => {
                expect(result).to.equal('User service is working')
            })
            .catch(error => {
                throw new Error('Unexpected failure! ', error)
            })
        })
    })
    
    let userDTO
    let userSaveStub

    userDTO = {
        user_name: 'John Doe',
        user_email: 'john.doe@example.com',
        user_phone: '1234567890',
        user_rut: '12345678-9'
    }
    userSaveStub = sandbox.stub(User.prototype, 'save').resolves(userDTO)
        
    afterEach(() => {
        userService = rewire('../services/userService')
        sandbox.restore()
    })

    describe('createUser', () => {
       it('Should return a user', async () => {
           userService.createUser(userDTO)
           .then((result) => {
               expect(result).to.equal(userDTO)
           })
           .catch((error) => {
               throw new Error('Unexpected failure!', error)
        })
       })
    })

})

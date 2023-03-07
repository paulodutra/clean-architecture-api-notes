import { User } from './user'
import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'

describe('user domain entity', () => {
    test('should not create user with valid name (too few characters)', () => {
        const invalidName = 'o     '
        const error =  User.create({ name: invalidName, email: 'any@mail.com' }) 
        expect(error).toEqual(left(new InvalidNameError()))                                                                                                         
    })

    test('should not create user with valid name (too many characters)', () => {
        const invalidName = 'o'.repeat(257)
        const error =  User.create({ name: invalidName, email: 'any@mail.com' }) 
        expect(error).toEqual(left(new InvalidNameError()))                                                                                                         
    })

    test('should not create user with invalid e-mail address', () => {
        const invalidEmail = 'invalid_email'
        const error = User.create({ name: 'any', email: invalidEmail })
        expect(error).toEqual((left(new InvalidEmailError())))
    })

    test('should create user with valid data', () => {
        const validName = 'any name'
        const validEmail = 'any@mail.com'
        const user = User.create({ name: validName, email: validEmail }).value as User
        expect(user.name.value).toEqual(validName)
        expect(user.email.value).toEqual(validEmail)
    })
})

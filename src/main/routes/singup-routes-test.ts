import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
const url = String(process.env.MONGO_URL)

describe('SingUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an accoutn on succes', async () => {
    await request(app)
      .post('/api/singup').send({
        name: 'Tallyto',
        email: 'rodrigues.tallyto@hotmail.com',
        password: '123',
        passwordConfirmation: '123'
      }).expect(200)
  })
})

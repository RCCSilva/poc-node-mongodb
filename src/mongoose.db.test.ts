import { Mongoose } from 'mongoose'
import { expect, test, describe, beforeAll } from 'vitest'

import { connect, Order } from './mongoose.db'

describe('mongoose', () => {
  let mongooseDb: Mongoose
  beforeAll(async () => {
    mongooseDb = await connect()
  })

  test('should create and find an order', async () => {
    // Act
    const order = await Order.create({
      randomText: 'RandomText',
      products: [{ name: 'Mongoose', price: 99.99 }]
    })

    // Assert
    const orderDb = await Order.findById(order.id)

    expect(orderDb).toBeDefined()
    expect(orderDb?.id).toEqual(order.id)
  })

  test('should not create orders when transaction fails', async () => {
    // Act
    const session = await mongooseDb.startSession();

    await session.withTransaction(async () => {
      await Order.create([
        {
          randomText: 'RandomText',
          products: [{ name: 'MongooseNotCreated', price: 1.1 }]
        },
        {
          randomText: 'RandomText',
          products: [{ name: 'MongooseNotCreated', price: 1.2 }]
        }, {
          randomText: 'RandomText',
          products: [{ name: 'MongooseNotCreated', price: 1.3 }]
        }
      ], { session })
      throw new Error('random error')
    }).catch((err: any) => { })

    await session.endSession()

    // Assert
    const orders = await Order.find({ 'products.name': 'MongooseNotCreated' })
    expect(orders).toHaveLength(0)
  })
})

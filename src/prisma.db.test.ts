import { faker } from '@faker-js/faker'
import { expect, test, describe } from 'vitest'

import { prismaDb } from './prisma.db'

describe('prisma', () => {
  test('should create and find an order', async () => {
    // Act
    const order = await prismaDb.order.create({
      data: {
        randomText: '1',
        products: {
          name: 'Test',
          price: 1.2
        }
      }
    })

    // Assert
    const orderDb = await prismaDb.order.findUnique({ where: { id: order.id } })
    expect(orderDb).toEqual(order)
  })

  test('should not create orders when transaction fails', async () => {
    // Act
    await prismaDb.$transaction(async (txClient) => {
      await txClient.order.create({
        data: {
          randomText: '1',
          products: { name: 'NotCreated', price: 1.2 }
        }
      })
      await txClient.order.create({
        data:
        {
          randomText: '1',
          products: { name: 'NotCreated', price: 1.2 }
        }
      })
      await txClient.order.create({
        data:
        {
          randomText: '1',
          products: { name: 'NotCreated', price: 1.2 }
        }
      })
      throw new Error('random error')
    }).catch(err => err)

    // Assert
    const orderDb = await prismaDb.order.findMany({ where: { products: { some: { name: 'NotCreated' } } } })
    expect(orderDb).toHaveLength(0)
  })

  // test('should create orders with transaction', async () => {
  //   // Act
  //   const productName = faker.random.word() + '_' + faker.random.alphaNumeric(5)
  //   await db.$transaction(async (txClient) => {
  //     await txClient.order.create({ data: { products: { name: productName, price: 0.2 } } })
  //     await txClient.order.create({ data: { products: { name: productName, price: 0.7 } } })
  //   })

  //   // Assert
  //   const orderDb = await db.order.findMany({ where: { products: { some: { name: productName } } } })
  //   expect(orderDb).toHaveLength(2)
  // })
})

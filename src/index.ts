import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'

import { prismaDb } from './prisma.db'
import { connect, Order } from './mongoose.db'

const buildApp = async () => {
  await connect()
  await prismaDb.$connect()

  const fastify = Fastify()

  fastify.get('/benchmark/mongoose', async (_, reply) => {
    // Create
    const order = await Order.create({ randomText: 'random', products: [{ name: 'RandomProduct', price: 99.99 }] })

    // Read
    await Order.findById(order.id)

    // Update
    await Order.findByIdAndUpdate(order.id, { randomText: 'updatedRandomText' })

    // Delete
    await Order.findByIdAndDelete(order.id)

    return reply
      .status(200)
      .send({ ok: true })
  })

  fastify.get('/benchmark/prisma', async (_, reply) => {
    // Create
    const order = await prismaDb.order.create({
      data: {
        randomText: 'random', products: [{ name: 'RandomProduct', price: 99.99 }]
      }
    })

    // Read
    await prismaDb.order.findUnique({
      where: { id: order.id }
    })

    // Update
    await prismaDb.order.update({
      where: { id: order.id },
      data: {
        randomText: 'UpdatedRandomText'
      }
    })

    // Delete
    await prismaDb.order.delete({ where: { id: order.id } })

    return reply
      .status(200)
      .send({ ok: true })
  })

  fastify.listen({ port: 3000 }, (err, addr) => {
    if (err) throw err
    console.log(`Listening on ${addr}`)
  })
}

buildApp()

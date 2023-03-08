import mongoose from 'mongoose';

export const connect = async () => {
  const mongooseDb = await mongoose.connect(process.env.DATABASE_URL!,)

  // mongooseDb.set("debug", (collectionName: any, method: any, query: any, doc: any) => {
  //   console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  // });

  return mongooseDb
}

interface IOrder {
  createdAt: Date
  randomText: string
  products: IProduct[]
}

interface IProduct {
  name: string
  price: number
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema<IOrder>({
  createdAt: { type: Date, required: true, default: new Date() },
  randomText: { type: String, required: true },
  products: { type: [productSchema], required: true }
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);

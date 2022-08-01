import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../common/mongoDB'
import WindowType from '../../interface/window';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WindowType[]>
) {
  const body = req.body ? JSON.parse(req.body) : null;
  windowHandler(req.method, body).then((data) => res.status(200).json(data));
}

const windowHandler = async (method: string | undefined, body: WindowType) => {
  try {
    await client.connect();
    const collection = getCollection();

    if (method === 'POST') {
      await collection.insertOne(body);
    } else if (method === 'PATCH') {
      const { _id, title, updatedDate } = body;
      await collection.updateOne({'_id': new ObjectId(_id)}, {$set: {title, updatedDate}});
    } else if (method === 'DELETE') {
      const { _id, deletedDate } = body;
      await collection.deleteOne({'_id': new ObjectId(_id)});
    }

    return await collection.find().sort({_id:-1}).toArray();
  } finally {
    await client.close();
  }
}

const getCollection = () => {
  return client.db(process.env.MONGO_DB_NAME).collection('window');
}
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../common/mongoDB'
import FrameType from '../../../../interface/frame';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FrameType[]>
) {
  const body = req.body ? JSON.parse(req.body) : null;
  windowHandler(req.method, body).then((data) => res.status(200).json(data));
}

const windowHandler = async (method: string | undefined, body: any) => {
  try {
    await client.connect();
    const collection = getCollection();

    if (method === 'PATCH') {
      const { _id, frames } = body;
      await collection.updateOne({'_id': new ObjectId(_id)}, {$set: {frames}});
    } else if (method === 'DELETE') {
      const { _id, deletedDate } = body;
      // await collection.deleteOne({'_id': new ObjectId(_id)});
      await collection.updateOne({'_id': new ObjectId(_id)}, {$set: {deletedDate}});
    }

    return await collection.findOne({_id: new ObjectId(body._id)}, {projection: { _id: 0, frames: 1 }});
  } finally {
    await client.close();
  }
}

const getCollection = () => {
  return client.db(process.env.MONGO_DB_NAME).collection('window');
}
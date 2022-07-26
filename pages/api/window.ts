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
    }
    // } else if (method === 'PATCH') {
    //   const {id, content } = JSON.parse(body);
    //   update({id, content} as TodoType).then(() => res.status(200).json('success'));
    // } else if (method === 'DELETE') {
    //   const id = JSON.parse(body);
    //   remove(id).then(() => res.status(200).json('success'));
    // }

    return await collection.find().sort({_id:-1}).toArray();
  } finally {
    await client.close();
  }
}

const get = async () => {
  try {
    await client.connect();
    const collection = getCollection();
    const cursor = collection.find().sort({_id:-1});
    const results = await cursor.toArray();
    return results;
  } finally {
    await client.close();
  }
}
const insert = async (window: WindowType) => {
  try {
    await client.connect();
    const collection = getCollection();
    const result = await collection.insertOne(window);
    return result;
  } finally {
    await client.close();
  }
}
const update = async ({id, content}: TodoType) => {
  try {
    await client.connect();
    const collection = getCollection();
    const result = await collection.updateOne({id}, {$set: {content}});
    return result;
  } finally {
    await client.close();
  }
}
const remove = async (id: number) => {
  try {
    await client.connect();
    const collection = getCollection();
    const result = await collection.deleteOne({id});
    return result;
  } finally {
    await client.close();
  }
}
const getCollection = () => {
  return client.db(process.env.MONGO_DB_NAME).collection('window');
}
const getList = (collection) => {
  return collection.find().sort({_id:-1});
}
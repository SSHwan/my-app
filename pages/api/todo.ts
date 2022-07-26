import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../common/mongoDB'
import type TodoType from '../../interface/todo';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoType[] | string>
) {
  if (req.method === 'GET') {
    get().then((data) => res.status(200).json(data)); 
  } else if (req.method === 'POST') {
    const {id, content} = JSON.parse(req.body);
    insert({id, content} as TodoType).then(() => res.status(200).json('success'));
  } else if (req.method === 'PATCH') {
    const {id, content } = JSON.parse(req.body);
    update({id, content} as TodoType).then(() => res.status(200).json('success'));
  } else if (req.method === 'DELETE') {
    const id = JSON.parse(req.body);
    remove(id).then(() => res.status(200).json('success'));
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
const insert = async (todo: TodoType) => {
  try {
    await client.connect();
    const collection = getCollection();
    const result = await collection.insertOne(todo);
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
  return client.db(process.env.MONGO_DB_NAME).collection('todo');
}
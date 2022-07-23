// import client from '../../common/mongoDB.js'

interface Props {
  client: any;
}

const Window = ({client}: Props) => {
  console.log('client >> ', client);
  return (
    <>
      <div>경산창호 입니다.</div>
    </>
  );
}

export default Window;

export async function getServerSideProps() {
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.sdd47jm.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err);
    }
    finally {
        await client.close();
    }
  }
  
  run();
  console.log(client);
  return {
      props: {
        client: uri
      }
  }
}
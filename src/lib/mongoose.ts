import mongoose from 'mongoose';

export const connectMongoose = async () => {
  const url = process.env.DB_MONGO_URL;
  const name = process.env.DB_MONGO_NAME;
  let port = process.env.DB_MONGO_PORT;
  const username = process.env.DB_MONGO_USERNAME;
  const password = process.env.DB_MONGO_PASSWORD;
  const args = process.env.DB_MONGO_ARGS;

  const uri = process.env.DB_MONGO_URI;

  if (uri === 'mongodb+srv') {
    port = '';
  } else {
    port = `:${process.env.DB_MONGO_PORT}`;
  }

  await mongoose.connect(
    `${uri}://${username}:${password}@${url}${port}/${name}${args}`
  );

  console.log(`\n        💾 Conexao do mongo estabilizada\n`);
};

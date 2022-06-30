import mongoose from 'mongoose';

export const connectMongoose = async () => {
  const url = process.env.DB_MONGO_URL;
  const name = process.env.DB_MONGO_NAME;
  const port = process.env.DB_MONGO_PORT;
  const username = process.env.DB_MONGO_USERNAME;
  const password = process.env.DB_MONGO_PASSWORD;

  await mongoose.connect(
    `mongodb://${username}:${password}@${url}:${port}/${name}?authSource=admin&readPreference=primary&directConnection=true&ssl=false`
  );

  console.log(`\n        💾 Conexao do mongo estabilizada\n`);
};

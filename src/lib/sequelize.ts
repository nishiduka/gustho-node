import { Sequelize } from 'sequelize';

const url = process.env.DB_URL || '';
const db = process.env.DB_NAME || '';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const logging = process.env.DB_LOG === 'true';

export const sequelize = new Sequelize(db, username, password, {
  dialect: 'mysql',
  host: url,
  port,
  logging,
});

const updateTables = async () => {
  await sequelize.sync({ alter: true });
  console.log(`\n        📝 Tabelas atualizadas\n`);
};
export const initSequlize = async () => {
  try {
    await sequelize.authenticate();
    console.log(`\n        💾 Conexao do banco de dados estabilizada\n`);

    await updateTables();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

sequelize.authenticate();

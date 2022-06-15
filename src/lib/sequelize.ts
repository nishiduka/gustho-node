import { Sequelize } from 'sequelize-typescript';
import { listModel } from '../modules/models';

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

const loadModels = async () => {
  await sequelize.addModels(listModel);
  console.log(`\n        📝 Tabelas adicionadas\n`);
};

const updateTables = async () => {
  await await sequelize.sync({ alter: false, force: false });
  console.log(`\n        📝 Tabelas atualizadas\n`);
};

export const initSequlize = async () => {
  try {
    await sequelize.authenticate();
    console.log(`\n        💾 Conexao do banco de dados estabilizada\n`);

    await loadModels();

    await updateTables();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

sequelize.authenticate();

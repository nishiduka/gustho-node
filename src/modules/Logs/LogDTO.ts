import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  endpoint: 'string',
  statusCode: 'string',
  createdAt: 'string',
  ip: 'string',
  timeElapsed: 'string',
});
export const LogsDTO = mongoose.model('logs', schema);

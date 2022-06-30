import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    user: 'string',
    body: {},
    responseMessage: {},
    code: 'string',
    endpoint: 'string',
  },
  { timestamps: true }
);
export const LogsErrorDTO = mongoose.model('logsError', schema);

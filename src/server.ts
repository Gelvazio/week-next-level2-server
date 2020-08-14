import express from 'express';

import './database';

const app = express();

app.use(express.json());

app.post('/users', (request, response) => {
  const users = request.body;
  return response.json(users);
})

app.listen(3333, () => {
  console.log("Server Ok.");
})
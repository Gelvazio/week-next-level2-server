import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';

import ConnectionRepository from '../repositories/ConnectionRepository';

class ConnectionsController {
  async create(request: Request, response: Response) {
    const connectionRepository = getCustomRepository(ConnectionRepository);

    const { user_id } = request.body;

    const connection = connectionRepository.create({
      user_id,
    });

    await connectionRepository.save(connection);

    return response.status(201).json(connection);
  }

  async index(request: Request, response: Response) {
    const connectionRepository = getCustomRepository(ConnectionRepository);

    response.json(await connectionRepository.count());
  }
}

export default new ConnectionsController();

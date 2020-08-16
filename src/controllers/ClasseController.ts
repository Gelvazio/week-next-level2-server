import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';

import ClasseRepository from '../repositories/ClasseRepository';
import convertHourToMinutes from '../utils/convertHoursToMinutes';
import UserRepository from '../repositories/UserRepository';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

class ClasseController {
  async create(request: Request, response: Response) {
    const classeRepository = getCustomRepository(ClasseRepository);
    const userRepository = getCustomRepository(UserRepository);

    const {
      user_id,
      subject,
      cost,
      schedule,
    } = request.body;

    const existUser = await userRepository.find({ id: user_id });

    if (!existUser) {
      return response.status(400).json({ message: "User doesn't exists!" });
    }

    const class_schedules = schedule.map((scheduleItem: ScheduleItem) => ({
      week_day: scheduleItem.week_day,
      from: convertHourToMinutes(scheduleItem.from),
      to: convertHourToMinutes(scheduleItem.to),
    }));

    const classe = classeRepository.create({
      user_id,
      subject,
      cost,
      class_schedules,
    });
    await classeRepository.save(classe);

    return response.status(201).json(classe);
  }

  async index(request: Request, response: Response) {
    const classeRepository = getCustomRepository(ClasseRepository);

    response.json(await classeRepository.find());
  }
}

export default new ClasseController();

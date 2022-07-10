import { NextFunction, Request, Response } from 'express';
import RemindersService from '@services/reminders.service';

class RemindersController {
  public remindersService = new RemindersService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reminders = await this.remindersService.find({});
      res.sendStatus(201).send({ reminders });
    } catch (error) {
      next(error);
    }
  };

  public save = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.remindersService.create(req.body);
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  };
  public fetch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reminders = await this.remindersService.fetch({});
      res.sendStatus(201).send({ reminders });
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default RemindersController;

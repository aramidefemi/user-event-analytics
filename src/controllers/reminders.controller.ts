import { NextFunction, Request, Response } from 'express';
import RemindersService from '@services/reminders.service';

class RemindersController {
  public remindersService = new RemindersService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user, after } = req.query;
      const query = {};
      if (user) query['user'] = user;
      if (after) {
        const afters: any = after; // typecasting to any to avoid error
        const afterDate = new Date(parseInt(afters)).toISOString();
        query['date'] = { $gt: afterDate };
      }

      const reminders = await this.remindersService.find(query);
      res.status(201).send(reminders);
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
      const { id } = req.params;
      const fetch_reminder_response = await this.remindersService.fetch({ id });
      if (fetch_reminder_response.status) {
        res.status(201).send(fetch_reminder_response);
      } else {
        res.status(404).send('ID not found');
      }
    } catch (error) {
      next(error);
    }
  };
}

export default RemindersController;

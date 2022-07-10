import { Router } from 'express';
import RemindersController from '@/controllers/reminders.controller';
import AnalyticsController from '@/controllers/analytics.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public remindersController = new RemindersController();
  public analyticsController = new AnalyticsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}analytics`, this.analyticsController.save);
    this.router.get(`${this.path}analytics`, this.analyticsController.fetch);
    this.router.get(`${this.path}reminders`, this.remindersController.fetch);
    this.router.get(`${this.path}reminders/:id`, this.remindersController.findAll);
    this.router.post(`${this.path}reminders`, validationMiddleware(CreateUserDto, 'body'), this.remindersController.save);
  }
}

export default IndexRoute;

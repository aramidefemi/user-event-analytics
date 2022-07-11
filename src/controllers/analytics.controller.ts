import { NextFunction, Request, Response } from 'express';
import AnalyticsService from '@services/analytics.service';
import async from 'async';

class AnalyticsController {
  public analyticsService = new AnalyticsService();

  public save = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      let ingested = 0;
      async.each(
        data,
        async (item: any) => {
          this.analyticsService.processRecord(item, () => {
            ++ingested;
          });
        },
        (err: any) => {
          if (err) {
            return next(err);
          }
          res.status(201).send({ ingested });
        },
      );
    } catch (error) {
      next(error);
    }
  };

  public fetch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const results = await this.analyticsService.fetchRecords();
      res.status(200).send({ results });
    } catch (error) {
      next(error);
    }
  };
}

export default AnalyticsController;

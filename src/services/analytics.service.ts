import { UserEventRecordDto } from '@/dtos/analytics.dto';
import Model from '@models/analytics.model';

class AnalyticsService {
  private lastEventTimestamp = {};
  private eventsDelay = {
    click: 3,
    pageView: 5,
  };

  private eventsDelayDefinition(eventType: string) {
    return this.eventsDelay[eventType] || 1; // always 1 second delay
  }

  private calculateDelay(time: string) {
    const t1 = new Date(time ?? null);
    const now = new Date();
    const dif = (now.getTime() - t1.getTime()) / 1000;
    return dif;
  }

  public async processRecord(event: { eventType: any; user: any }, done: { (): void; (): any }) {
    const eventType = event.eventType;
    const user = event.user;

    if (!eventType && !user) return;

    const lastEventTimestamp = this.lastEventTimestamp[user] ?? {};

    const delay = this.calculateDelay(lastEventTimestamp[eventType]);
    if (delay >= this.eventsDelayDefinition(eventType)) {
      this.lastEventTimestamp[user] = {};
      this.lastEventTimestamp[user][eventType] = new Date();
      this.saveRecord({ eventType, user });
      return done();
    }
    return;
  }

  private saveRecord({ eventType, user }: UserEventRecordDto) {
    const date = new Date();

    const analytic = new Model({ eventType, user, date });
    return analytic.save();
  }
  public async fetchRecords() {
    const analytics = await Model.find({});
    return analytics;
  }
}

export default AnalyticsService;

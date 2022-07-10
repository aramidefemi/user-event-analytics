import { CreateReminderDto, FindReminderDto } from '@dtos/reminders.dto';
import Model from '@models/reminders.model';

class ReminderService {
  public async find(query: FindReminderDto) {
    try {
      const result = await Model.findOne(query);
      return { status: true, result };
    } catch (error) {
      return { status: false, error };
    }
  }

  public async fetch(query: FindReminderDto) {
    try {
      const result = await Model.findOne(query);
      return { status: true, result };
    } catch (error) {
      return { status: false, error };
    }
  }

  public async create(payload: CreateReminderDto) {
    try {
      const result = await Model.create(payload);
      return { status: true, result };
    } catch (error) {
      return { status: false, error };
    }
  }
}

export default ReminderService;

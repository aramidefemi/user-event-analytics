import { IsNumber, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  public description: string;
  @IsNumber()
  public user: string;
  @IsString()
  public date: string;
}

export class FindReminderDto {
  @IsString()
  public id?: string;
  @IsString()
  public user?: string;
  @IsString()
  public date?: string;
}

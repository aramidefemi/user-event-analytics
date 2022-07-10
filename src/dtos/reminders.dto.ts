import { IsEmail, IsString, ValidateNested } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  public description: string;
  @IsString()
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

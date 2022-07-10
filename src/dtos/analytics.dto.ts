import { IsEmail, IsString, ValidateNested } from 'class-validator';

export class UserEventRecordDto {
  @IsString()
  public eventType: String;
  @IsString()
  public user: Number;
}

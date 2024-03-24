import { UserType } from '../../../types/user.js';

export class CreateUserDto {
  public email: string;
  public avatar?: string | undefined;
  public name: string;
  public password: string;
  public userType: UserType;
}

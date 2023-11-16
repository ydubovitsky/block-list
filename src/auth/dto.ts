import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignUpBodyDto {
  @ApiProperty({
    example: 'test@email.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'we#fcw12ca21',
  })
  @IsNotEmpty()
  password: string;
}

export class SignInBodyDto {
  @ApiProperty({
    example: 'test@email.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'we#fcw12ca21',
  })
  @IsNotEmpty()
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  iat: number

  @ApiProperty()
  exp: number
}
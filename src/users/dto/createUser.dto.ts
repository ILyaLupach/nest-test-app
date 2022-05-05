import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'email' })
  @IsString({ message: 'only string' })
  @IsEmail({}, { message: 'wrong email address' })
  readonly email: string

  @ApiProperty({ example: 'qwe123456', description: 'password' })
  @IsString()
  @Length(4, 60, { message: 'min 4 characters' })
  readonly password: string
}

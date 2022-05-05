import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'email' })
  readonly email: string

  @ApiProperty({ example: 'qwe123456', description: 'password' })
  readonly password: string
}

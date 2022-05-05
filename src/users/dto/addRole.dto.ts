import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class AddRoleDto {
  @ApiProperty({ example: 'user' })
  @IsString({ message: 'only string' })
  readonly value: string

  @ApiProperty({ example: 123 })
  @IsNumber({}, { message: 'only number' })
  readonly userId: number
}

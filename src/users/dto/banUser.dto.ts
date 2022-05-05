import { ApiProperty } from '@nestjs/swagger'

export class BanUserDto {
  @ApiProperty({ example: 123 })
  readonly userId: number

  @ApiProperty({ example: true })
  readonly value: boolean

  @ApiProperty({ example: 'inactive user' })
  readonly banReason: string
}

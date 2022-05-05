import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'role name' })
  readonly value: string

  @ApiProperty({ example: 'has all access rights' })
  readonly description: string
}

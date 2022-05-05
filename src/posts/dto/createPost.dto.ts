import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty({ example: 'title' })
  readonly title: string

  @ApiProperty({ example: 'post content' })
  readonly content: string

  @ApiProperty({ example: 123 })
  readonly userId: number
}

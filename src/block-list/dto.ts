import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class BlockItemDto {

  @ApiProperty()
  id: number

  @ApiProperty()
  blockListId: number

  @ApiProperty()
  type: string

  @ApiProperty()
  data: string

  @ApiProperty()
  createdAt: Date
}

export class BlockListDto {

  @ApiProperty()
  id: number

  @ApiProperty()
  ownerId: number

  @ApiProperty({
    type: [BlockItemDto]
  })
  items: BlockItemDto[]
}

export class AddBlockItemDto {

  @ApiProperty()
  type: string

  @ApiProperty()
  data: string

}

export class BlockListQueryDto {

  @ApiProperty({required: true})
  @IsOptional()
  q?: string

}
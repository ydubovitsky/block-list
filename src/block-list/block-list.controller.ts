import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AddBlockItemDto, BlockItemDto, BlockListDto, BlockListQueryDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { BlockListService } from './block-list.service';

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {

  constructor(private blockListService: BlockListService) { }

  @Get()
  @ApiOkResponse({
    type: BlockListDto
  })
  getList(@Query() query: BlockListQueryDto, @SessionInfo() session: GetSessionInfoDto): Promise<BlockListDto> {
    return this.blockListService.getByUserId(session.id, query)
  }

  @Post("item")
  @ApiCreatedResponse({
    type: BlockItemDto
  })
  addBlockListItem(@Body() body: AddBlockItemDto, @SessionInfo() session: GetSessionInfoDto): Promise<BlockItemDto> {
    return this.blockListService.addBlockItem(session.id, body);
  }


  @Delete("item/:id")
  @ApiOkResponse({
    type: 'number'
  })
  async deleteBlockItem(@Param("id", ParseIntPipe) id: number, @SessionInfo() session: GetSessionInfoDto): Promise<number> {
    await this.blockListService.removeBlockItem(session.id, id);
    return id
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}
  @Post()
  createMessage(@Body() body: any) {}
  @Get('/:id')
  getMessage() {}
}

import { Controller, Get, Res, Logger, Query, Render } from '@nestjs/common';
import { Response } from 'express';
import { getLinkHeader } from './utils';

/**
 * Simulates loading some random Miro page
 */
@Controller('foo')
export class FooController {
  constructor() {}

  @Get()
  @Render('foo')
  getBoardHtml(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    Logger.log('render foo');

    const boardUrl = query.from ? `https://miro.com/${query.from}/` : undefined;
    boardUrl && res.set(getLinkHeader(boardUrl));
    return boardUrl ? { boardUrl } : undefined;
  }
}

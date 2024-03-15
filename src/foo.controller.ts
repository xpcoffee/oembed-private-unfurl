import { Controller, Get, Res, Logger, Query, Render } from '@nestjs/common';
import { Response } from 'express';
import { getLinkHeader, getMiroUrlFromPath } from './utils';

/**
 * Simulates loading some random page, to validate if redirects are being followed.
 */
@Controller('foo')
export class FooController {
  constructor() {}

  /**
   * Loads a page with oEmbed link tags && link headers.
   */
  @Get()
  @Render('foo')
  getBoardHtml(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    Logger.log('render foo');

    const boardUrl = getMiroUrlFromPath(query.from);
    boardUrl && res.set(getLinkHeader(boardUrl));
    return boardUrl ? { boardUrl } : undefined;
  }
}

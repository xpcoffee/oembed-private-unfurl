import { Controller, Get, Res, Logger, Query, Render } from '@nestjs/common';
import { Response } from 'express';
import { getLinkHeader } from './utils';

/**
 * Simulates loading a Miro board
 */
@Controller('login')
export class LoginController {
  constructor() {}

  /**
   * Loads the dummy board page, which contains oEmbed headers.
   */
  @Get()
  @Render('login')
  getBoardHtml(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    Logger.log('render login');

    const boardUrl = query.from ? `https://miro.com/${query.from}/` : undefined;
    boardUrl && res.set(getLinkHeader(boardUrl));
    return boardUrl ? { boardUrl } : undefined;
  }
}

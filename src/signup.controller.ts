import { Controller, Get, Res, Logger, Query, Render } from '@nestjs/common';
import { Response } from 'express';
import { getLinkHeader } from './utils';

/**
 * Simulates loading signup screen
 */
@Controller('signup')
export class SignupController {
  constructor() {}

  /**
   * Loads the dummy board page, which contains oEmbed headers.
   */
  @Get()
  @Render('signup')
  getBoardHtml(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    Logger.log('render signup');

    const boardUrl = query.from ? `https://miro.com/${query.from}/` : undefined;
    boardUrl && res.set(getLinkHeader(boardUrl));
    return boardUrl ? { boardUrl } : undefined;
  }
}

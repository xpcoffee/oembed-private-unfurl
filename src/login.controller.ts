import { Controller, Get, Res, Logger, Query, Render } from '@nestjs/common';
import { Response } from 'express';
import { getLinkHeader, getMiroUrlFromPath } from './utils';

/**
 * Simulates loading the login screen. To validate if iFramely short-circuits the redirect.
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

    const boardUrl = getMiroUrlFromPath(query.from);
    boardUrl && res.set(getLinkHeader(boardUrl));
    return boardUrl ? { boardUrl } : undefined;
  }
}

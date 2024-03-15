import { Controller, Get, Res, Logger, Query, Render } from '@nestjs/common';
import { Response } from 'express';
import { getLinkHeader, getMiroUrlFromPath } from './utils';

/**
 * Simulates loading the signup screen. To validate if iFramely short-circuits the redirect.
 */
@Controller('signup')
export class SignupController {
  constructor() {}

  /**
   * Loads a page with oEmbed link tags && link headers.
   */
  @Get()
  @Render('signup')
  getBoardHtml(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    Logger.log('render signup');

    const boardUrl = getMiroUrlFromPath(query.from);
    boardUrl && res.set(getLinkHeader(boardUrl));
    return boardUrl ? { boardUrl } : undefined;
  }
}

import {
  Controller,
  Get,
  Param,
  Res,
  Logger,
  Query,
  Headers,
} from '@nestjs/common';
import { Response } from 'express';
import { getLinkHeader } from './utils';

/**
 * Simulates loading a Miro board
 */
@Controller('app/board')
export class BoardController {
  constructor() {}

  @Get(':boardId')
  getBoardHtml(
    @Param() params: any,
    @Query() query: any,
    @Res() res: Response,
    @Headers() headers,
  ) {
    const url = encodeURIComponent(
      `https://miro.com/app/board/${params.boardId}`,
    );

    const host = headers.host;

    /**
     * Simulate short-circuiting to a dummy page based on the user agent.
     */
    const shouldServeDummyPage =
      query.dummy === 'true' &&
      headers['user-agent']?.toLowerCase().includes('iframely');

    if (shouldServeDummyPage) {
      Logger.log('render dummy page');
      res.set(getLinkHeader(url));
      res.render('dummy', { boardUrl: url });
      return;
    }

    /**
     * Simulate a redirect.
     */
    const redirect = query.redirect;
    switch (redirect) {
      // redirect to an auth path
      case 'login':
      case 'signup':
      // tests a random pattern for a redirect path
      case 'foo':
        Logger.log(`redirect to ${redirect}`);

        res
          .set(getLinkHeader(url))
          .redirect(
            `https://${host}/${redirect}/?from=app/board/${params.boardId}`,
          );
        return;

      default:
        if (redirect !== undefined) {
          Logger.log(`Unknown redirect. Will not redirect: ${redirect}`);
        }
    }

    /**
     * Actual "board" render.
     */
    Logger.log('render board');
    res.set(getLinkHeader(url));
    res.render('board', { boardUrl: url });
  }
}

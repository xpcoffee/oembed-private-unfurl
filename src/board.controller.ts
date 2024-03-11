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
     * Tests redirection to a login page.
     */
    if (query.login !== undefined && query.login === 'true') {
      Logger.log('redirect to login');

      res
        .set(getLinkHeader(url))
        .redirect(`https://${host}/login/?from=app/board/${params.boardId}`);
      return;
    }

    /**
     * Tests redirection to a signup page.
     */
    if (query.signup !== undefined && query.signup === 'true') {
      Logger.log('redirect to signup');

      res
        .set(getLinkHeader(url))
        .redirect(`https://${host}/signup/?from=app/board/${params.boardId}`);
      return;
    }

    /**
     * Tests redirection to a random Miro page.
     */
    if (query.foo !== undefined && query.foo === 'true') {
      Logger.log('redirect to foo');

      res
        .set(getLinkHeader(url))
        .redirect(`https://${host}/foo/?from=app/board/${params.boardId}`);
      return;
    }

    Logger.log('render board');
    res.set(getLinkHeader(url));
    res.render('board', { boardUrl: url, boardId: params.boardId });
  }
}

import { Controller, Get, Param, Render, Res, Logger } from '@nestjs/common';
import { Response } from 'express';

/**
 * Simulates loading a Miro board
 */
@Controller('app/board')
export class ExampleController {
  constructor() {}

  /**
   * Loads the dummy board page, which contains oEmbed headers.
   */
  @Render('index')
  @Get(':boardId')
  getBoardHtml(
    @Param() params: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    Logger.log('render');

    const url = encodeURIComponent(
      `https://miro.com/app/board/${params.boardId}`,
    );

    res.set(
      'Link',
      [
        `<https://miro.com/api/v1/oembed?format=json&url=${url}>; rel="alternate"; type="application/json+oembed"; title="Test page link JSON"`,
        `<https://miro.com/api/v1/oembed?format=xml&url=${url}>; rel="alternate"; type="text/xml+oembed"; title="Test page link XML"`,
      ].join(','),
    );

    return { boardUrl: url, boardId: params.boardId };
  }

  /**
   * Redirects to /:boardId - used to simulate a redirect to a signin page.
   */
  @Get('unauthenticated/:boardId')
  getRedirect(@Param() params: any, @Res({ passthrough: true }) res: Response) {
    Logger.log('redirect');

    const url = encodeURIComponent(
      `https://miro.com/app/board/${params.boardId}`,
    );

    res
      .set(
        'Link',
        [
          `<https://miro.com/api/v1/oembed?format=json&url=${url}>; rel="alternate"; type="application/json+oembed"; title="Test page redirect JSON"`,
          `<https://miro.com/api/v1/oembed?format=xml&url=${url}>; rel="alternate"; type="text/xml+oembed"; title="Test page redirect XML"`,
        ].join(','),
      )
      .redirect(
        `https://53f2-208-127-124-158.ngrok-free.app/app/board/${params.boardId}`,
      );
  }
}

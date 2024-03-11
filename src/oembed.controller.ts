import { Controller, Get, Param, Render, Res, Logger } from '@nestjs/common';
import { Response } from 'express';

@Controller('oembed')
export class OembedController {
  constructor() {}

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
        `<https://miro.com/app/live-embed/${params.boardId}>; rel="iframely"; type="text/html"; media="(aspect-ratio: 1280/720)"`,
      ].join(','),
    );

    return { boardUrl: url, boardId: params.boardId };
  }

  @Get('redirect/:boardId')
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
          `<https://miro.com/app/live-embed/${params.boardId}>; rel="iframely"; type="text/html"; media="(aspect-ratio: 1280/720)"`,
        ].join(','),
      )
      .redirect(
        `https://53f2-208-127-124-158.ngrok-free.app/oembed/${params.boardId}`,
      );
  }
}

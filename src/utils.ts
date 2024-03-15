export function getLinkHeader(url: string) {
  return {
    Link: [
      `<https://miro.com/api/v1/oembed?format=json&url=${url}>; rel="alternate"; type="application/json+oembed"; title="Test page link JSON"`,
      `<https://miro.com/api/v1/oembed?format=xml&url=${url}>; rel="alternate"; type="text/xml+oembed"; title="Test page link XML"`,
    ].join(','),
  };
}

export function getMiroUrlFromPath(path?: string) {
  if (path === undefined) return undefined;
  return `https://miro.com/${path}`;
}

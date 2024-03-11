# oEmbed private unfurling PoC

## Description

A small app that shows a minimal PoC of oEmbed discovery mechanism.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing it using iFramely & ngrok


 - iFramely is one of the oEmbed consumers that will use this. You using this link to test the flow https://iframely.com/try?url=https%3A%2F%2F53f2-208-127-124-158.ngrok-free.app%2Foembed%2Fredirect%2Fo9J_lljaUTY%3D%3Fhello%3Dworld
 - iFramely doesn't allow calls against localhost. You can use https://ngrok.com/ to get a domain online with which to call.

Running ngrok
```
ngrok http http://localhost:3000
```

Example use of iFramely

![example use of iFramely](example.png)



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

## PoC 2024-03

### Method: testing using iFramely & ngrok


 - iFramely is one of the oEmbed consumers that will use this. You can test the flow [using this link](https://iframely.com/try?url=https%3A%2F%2F53f2-208-127-124-158.ngrok-free.app%2Foembed%2Fredirect%2Fo9J_lljaUTY%3D%3Fhello%3Dworld).
 - iFramely doesn't allow calls against localhost. You can use https://ngrok.com/ to get a domain online with which to call.

Running ngrok
```
ngrok http http://localhost:3000
```

Example use of iFramely

![example use of iFramely](example.png)

### Finding #1 - iFramely has custom handling for redirects to "login" pages

We can successfully get oEmbed flow to work using a query params.

🟢 Succeeds
```
https://<ngrok-domain>/app/board/uXjVPN7re9A=/?foo=true
```
```
[Nest] 94884  - 03/11/2024, 9:11:16 PM     LOG redirect to foo
[Nest] 94884  - 03/11/2024, 9:11:16 PM     LOG render foo
```

![alt text](success.png)

### Finding #2 - iFramely short-circuits to a 403 result for redirects to "login" or "signup" pages

---


🔴 Fails
```
https://<ngrok-domain>/app/board/uXjVPN7re9A=/?login=true
```
```
[Nest] 94884  - 03/11/2024, 9:10:33 PM     LOG redirect to login
[Nest] 94884  - 03/11/2024, 9:10:33 PM     LOG render login
```

![403 result](403.png)

---

🔴 Fails 
```
https://<ngrok-domain>/app/board/uXjVPN7re9A=/?signup=true
```
```
[Nest] 94884  - 03/11/2024, 9:15:12 PM     LOG redirect to signup
[Nest] 94884  - 03/11/2024, 9:15:12 PM     LOG render signup
```

![403 result](403.png)
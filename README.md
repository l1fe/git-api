## What is `git-api` ?

`git-api` a small *NodeJS* HTTP API server designed for searching for Github repositories

## Getting Started
Before installing the app make sure that you have `node`, `npm` , `npx` and `yarn` (optionally) installed globally.

To get started just follow these steps in your terminal app.

```bash
# Get the latest snapshot
git clone https://github.com/l1fe/git-api.git myproject

# Change directory
cd myproject

# Install NPM dependencies
yarn install

# Then simply start your app
yarn start
```


**API Specification**
----

###
* **URL:**	`GET /api/repos`
* **Description:** Get all repos (*optionally can filter by query string params*)
* **Query String Params (Optional)** `name`, `bookmarked`
* **Success Response Status:** `200 OK`
* **Success Response Body:**
```js
[
  {
    "id": 1,
    "name": "grit",
    "description": "**Grit is no longer maintained. Check out libgit2/rugged.** Grit gives you object oriented read/write access to Git repositories via Ruby.",
    "bookmarked": false,
    "url": "https://api.github.com/repos/mojombo/grit"
  },
  {
    "id": 26,
    "name": "merb-core",
    "description": "Merb Core: All you need. None you don't.",
    "bookmarked": false,
    "url": "https://api.github.com/repos/wycats/merb-core"
  }
]
```

* **Error Response:** `400 Bad Request`

###
* **URL:**	`GET /api/repos/:id`
* **Description:** Get the repo with the given `id`
* **URL Params (required)** `id`
* **Success Response Status:** `200 OK`
* **Success Response Body:**
```js
{
  "id": 1,
  "name": "grit",
  "description": "**Grit is no longer maintained. Check out libgit2/rugged.** Grit gives you object oriented read/write access to Git repositories via Ruby.",
  "bookmarked": false,
  "url": "https://api.github.com/repos/mojombo/grit"
}
```
* **Error Response:** `404 Not Found`

###
* **URL:**	`PATCH /api/repos/:id`
* **Description:** Update the repo's `bookmarked` value
* **URL Params (required)** `id`
* **Success Response Status:** `200 OK`
* **Success Response Body:**
```js
{
  "id": 1,
  "name": "grit",
  "description": "**Grit is no longer maintained. Check out libgit2/rugged.** Grit gives you object oriented read/write access to Git repositories via Ruby.",
  "bookmarked": true,
  "url": "https://api.github.com/repos/mojombo/grit"
}
```
* **Error Response:** `404 Not Found`

## Packages and Tools

- [node](http://nodejs.org/)
- [express](https://npmjs.com/package/express)
- [axios](https://www.npmjs.com/package/axios)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express-validation](https://www.npmjs.com/package/express-validation)
- [http-status](https://www.npmjs.com/package/http-status)
- [joi](https://www.npmjs.com/package/joi)
- [shortid](https://www.npmjs.com/package/shortid)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [babel-cli](https://www.npmjs.com/package/babel-cli)
- [eslint](https://www.npmjs.com/package/eslint)
- [mocha](https://www.npmjs.com/package/mocha)
- [chai](https://www.npmjs.com/package/chai)
- [chai-as-promised](https://www.npmjs.com/package/chai-as-promised)
- [sinon](https://www.npmjs.com/package/sinon)
- [supertest](https://www.npmjs.com/package/supertest)
- [proxyquire](https://www.npmjs.com/package/proxyquire)
- [pre-git](https://www.npmjs.com/package/pre-git)

## License

MIT

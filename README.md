<h1 align="center" >RESTfulApi by Node/Express and Mongodb</h1>

## Intro

> Pembuatan Restful-API menggunakan Javascript Syntax dari sisi backend dengan library NodeJs dan database Non-SQL yakni MongoDB

### Project Setup

```
Branch: master (Basic Setup)
Branch: usersetup (user Setup)
Branch: dev (complete Setup)
Branch: refactoring (clean-code Setup)
```

- **Bahan**<br/>

initialisasi project yang akan dibuat

```sh
    npm init
    npm install
```

```json
//install masing package berikut
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.6.12",
    "morgan": "^1.9.1",
    "multer": "^1.4.2"
  },
  //npm install --save-dev nodemon
  "devDependencies": {
    "nodemon": "^1.19.2"
  },
```

- **Basic**<br/>

1. buat file 'app.js' sebagai file root yang dimana terdapat beberapa bagian bisa dilihat dari commit-an.
2. file 'server.js' sebagai server/bagian penghubung.
3. folder 'api' dengan 2 folder didalamnya "models (struktur data untuk ke database)", dan 'routes(file logic CRUD pemograman )'.

- **Penting**<br/>
  > seluruh syntax merupakan javascript modern ES6/7, dan banyak syntax yg sama karena untuk pembelajaran.

const express = require("express");
const cors = require('cors')
const config = require('./src/config/config');
const formData = require('express-form-data');
const cookieParser = require('cookie-parser');
// const sockets = require('./src/socket')
//const dummyUserFn = require('./src/middlewares/dummyUserFn');

let app = express();
const corsOptions = {
    origin: "http://localhost:3004",
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));

//socketio
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    }
})

// sockets(io)

//Server Settings
const PORT = 8003;
const path = require("path");
const bodyParser = require("body-parser");
const bootstrap = require("./src/bootstrap");
const { logging } = require("./src/middlewares/logging");
const { errorHandler } = require("./src/middlewares/errorHandler");

//Parse data with connect-multiparty. 
app.use(formData.parse({}));
//Delete from the request all empty files (size == 0)
app.use(formData.format());
//Change the file objects to fs.ReadStream 
app.use(formData.stream());
//Union the body and the files
app.use(formData.union());

app.use(cookieParser(config.COOKIE_SECRET))

//Pug Template Engine
app.set("view engine", "pug");
app.set("views", path.resolve("./src/views"));

//Request Parsing
app.use(bodyParser.json({
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.startsWith('/webhook')) {
         req.rawBody = buf.toString();
      }
    }
  }));
app.use(bodyParser.urlencoded({ extended: true }));

//Express Router
const router = express.Router();
app.use(router);
const rootPath = path.resolve("./dist");

app.use(express.static(rootPath));
bootstrap(app, router);

//Index Page (Home public page)
router.get('/', (req, res, next) => {
    res.send('<html><title>Backend API system for experimenting security concept</title><body>This project provides only backend API support</body></html>');
    res.end();
});

router.use((err, req, res, next) => {
    if (err) {
        //Handle file type and max size of image
        return res.send(err.message);
    }
});

router.use(logging);
router.use(errorHandler);

process.on('uncaughtException', function (error, origin) {
    //Handle the error safely. 
    //Developer note: As long as you have callback hell, the error handling code
    //will break. This often occurs during team development.
    //Key reference: https://www.toptal.com/nodejs/node-js-error-handling
    console.log('process.on method is automatically called for unhandled errors:\n ',
        error, 'origin:\n',
        origin);
    process.exit(1);
})

server.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: http://localhost:${PORT}/`);
});
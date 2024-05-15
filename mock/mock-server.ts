import route from './routes/index';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
// import yaml from 'yamljs';
import http from 'http';
import path from 'path';

const app = express();
const port = 9090;

// Compression
app.use(compression());
// Logger
app.use(morgan('dev'));
// Enable CORS
app.use(cors());
// POST, PUT, DELETE body parser
app.use(express.json({ limit: '20mb' }));
app.use(
  express.urlencoded({
    limit: '20mb',
    extended: false
  })
);
// No Cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '-1');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', route);

// Catch 404 and forward to error handler
app.use((req, res) => {
  const error = new Error('Not Found');
  res.status(404).json({
    message: error.message,
    error: error
  });
});

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
console.log('Mock server started on port ' + port + '!');

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

  switch (error.code) {
    case 'EACCES':
      console.error('Express ERROR (app) : %s requires elevated privileges', bind);
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case 'EADDRINUSE':
      console.error('Express ERROR (app) : %s is already in use', bind);
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    default:
      throw error;
  }
}

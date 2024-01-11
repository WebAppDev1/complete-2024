'use strict';

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (request, response) => response.send('Welcome to the Playlist app!'));
app.get("/dashboard", (request, response) => {
  const playlist = [
    {
      id: 1,
      title: "Piano Sonata No. 3",
      artist: "Beethoven"
    },
    {
      id: 2,
      title: "Piano Sonata No. 7",
      artist: "Beethoven"
    },
    {
      id: 3,
      title: "Piano Sonata No. 10",
      artist: "Beethoven"
    }
  ];
  response.json(playlist);
});
app.get('/error', (request, response) => response.status(404).end('Page not found.'));

app.listen(port, () => console.log(`Express app running on port ${port}!`));
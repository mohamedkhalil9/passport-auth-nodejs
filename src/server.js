import app from './app.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app in listening on port ${PORT}`);
})

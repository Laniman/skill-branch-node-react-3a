import express from 'express';
import cors from 'cors';
import getPc from './getPc';

const app = express();
app.use(cors());

app.get('/volumes', async (req, res) => {
  const { hdd } = await getPc();
  const volumes = hdd.reduce((acc, { volume, size }) => {
    const newAcc = { ...acc, [volume]: acc[volume] ? acc[volume] + Number(size) : Number(size) };
    return newAcc;
  }, {});

  const result = Object.keys(volumes)
    .reduce((acc, key) => {
      const newAcc = { ...acc, [key]: `${acc[key]}B` };
      return newAcc;
    }, volumes);
  res.json(result);
});

app.get('*', async (req, res) => {
  const pc = await getPc();
  try {
    const r = req.path.split('/')
      .filter(e => !!e)
      .reduce((acc, item) => {
        if (!Object.keys(acc).includes(item)) {
          throw new Error('Not Found');
        } else {
          return acc[item];
        }
      }, pc);
    res.json(r);
  } catch (e) {
    res.sendStatus(404);
    res.end(e.message);
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

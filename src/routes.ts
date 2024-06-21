import express from 'express';
import fs from 'fs';

const router = express.Router();

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

const readDatabase = (): Submission[] => {
  const data = fs.readFileSync('./src/db.json', 'utf8');
  return JSON.parse(data);
};

const writeDatabase = (data: Submission[]) => {
  fs.writeFileSync('./src/db.json', JSON.stringify(data, null, 2));
};

router.get('/ping', (req, res) => {
  res.send(true);
});

router.post('/submit', (req, res) => {
  const newSubmission: Submission = req.body;
  const data = readDatabase();
  data.push(newSubmission);
  writeDatabase(data);
  res.send({ message: 'Submission saved!' });
});

router.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string);
  const data = readDatabase();
  if (index >= 0 && index < data.length) {
    res.send(data[index]);
  } else {
    res.status(404).send({ message: 'Submission not found' });
  }
});



// Delete 
router.delete('/delete', (req, res) => {
  const index = parseInt(req.query.index as string);
  const data = readDatabase();
  if (index >= 0 && index < data.length) {
    const deleted = data.splice(index, 1);
    writeDatabase(data);
    res.send(deleted);
  } else {
    res.status(404).send({ message: 'Submission not found' });
  }
});

// Edit 
router.put('/edit', (req, res) => {
  const index = parseInt(req.query.index as string);
  const updatedSubmission: Submission = req.body;
  const data = readDatabase();
  if (index >= 0 && index < data.length) {
    data[index] = updatedSubmission;
    writeDatabase(data);
    res.send({ message: 'Submission updated!' });
  } else {
    res.status(404).send({ message: 'Submission not found' });
  }
});

// Search by email
router.get('/search', (req, res) => {
  const email = req.query.email as string;
  const data = readDatabase();
  const result = data.filter(submission => submission.email === email);
  res.send(result);
});

export default router;

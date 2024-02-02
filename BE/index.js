const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./Routes/routes');
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.send('Server is running and accessible!');
});
app.use('/v1', routes)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


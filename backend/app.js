const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/chartVis', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const dataRoutes = require("./routes/dataRoutes.js");
app.use('/api/salaries', dataRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

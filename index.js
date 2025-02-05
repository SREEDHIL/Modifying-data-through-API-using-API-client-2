const express = require('express');
const { resolve } = require('path');
const {menuItems} = require('./model/menu');
const menuRouter = require('./routes/menuRoutes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3010;
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async()=>{
  try{
    await mongoose.connect(MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true});
    console.log('Database connected Successfully!')
  }
  catch(error){
    console.error('Unable to connect to DB', error)
  }
};

connectDB();

const app = express();
app.use(express.json());

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/menu/:id', menuRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/auth', authRoutes);
app.get('/health', (req,res)=>res.json({status:'ok'}));
const port = process.env.PORT || 3001;
app.listen(port, ()=>console.log('User service listening on', port));
module.exports = app; // for tests

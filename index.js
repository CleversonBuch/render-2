
const express = require('express');
const cors = require('cors');
const freteRoutes = require('./routes/frete');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/frete', freteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

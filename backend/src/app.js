const express = require('express');
// const { productsController } = require('./controllers');
const { productsRouter } = require('./routers');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRouter);

// app.get('/products', async (_req, res) => {
//   const result = await productsController.findAll();
//   res.status(200).json(result);
// });

// app.get('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const result = await productsController.findById(id);
//   if (result) {
//     return res.status(200).json(result);
//   }
//   return res.status(404).json({
//     message: 'Product not found',
//   });
// });

module.exports = app;

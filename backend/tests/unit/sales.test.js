const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(sinonChai);
const { expect } = chai;
const { salesModel } = require('../../src/models');
const { salesService } = require('../../src/services');
const { salesController } = require('../../src/controllers');
const mockSales = require('../../src/mocks/sales');
const saleValidation = require('../../src/middlewares/saleValidation');

describe('Testando salesController', function () {
  describe('Listagem de todas as vendas', function () {
    it('Retorna todas as vendas e status 200', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves(mockSales);

      await salesController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockSales);
    });
  });
  describe('Sale com o id presente na URL deve ser retornada;', function () {
    it('Retorna a sale buscada e status 200', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves(mockSales);

      await salesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockSales);
    });
  });
  describe('Sale com id inexistente deve retornar mensagem e status 404', function () {
    it('Retorna mensagem sale not found e status 404', async function () {
      const res = {};
      const req = { params: { id: 10000 } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(salesService, 'findById')
        .resolves({ message: 'Sale not found' });
  
      await salesController.findById(req, res);
  
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  describe('Testando inserção de vendas no banco de dados', function () {
    it('Testando endpoint post /sales', async function () {
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };
      
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      sinon.stub(salesService, 'createSale').resolves({
        id: 3,
        itemsSold: req.body,
      });
  
      await salesController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 3,
        itemsSold: req.body,
     });
    });
   });
   describe('Pesquisando uma venda', function () {
    it('deve retornar status 200 e venda', async function () {
      const sales = [
        {
            saleId: 1,
            date: '2023-05-30T15:40:31.000Z',
            productId: 1,
            quantity: 5,
          },
          {
            saleId: 1,
            date: '2023-05-30T15:40:31.000Z',
            productId: 2,
            quantity: 10,
          },
          {
            saleId: 2,
            date: '2023-05-30T15:40:31.000Z',
            productId: 3,
            quantity: 15,
          },
      ];
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves(sales);

      await salesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
    it('deve retornar status 404 se for passado um id que não existe', async function () {
      const res = {};
      const req = {
        params: { id: 999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById')
        .resolves({ message: 'Product not found' });

      await salesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Cadastrando uma venda', function () {
    it('deve retornar status 200 e venda', async function () {
      const itemsSold = [
        {
          productId: 1,
          quantity: 5,
        },
      ];
      const newSale = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 5,
          },
        ],
      };
      const res = {};
      const req = {
        body: itemsSold,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .resolves(newSale);

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });

    it('Se o productId não for informado, retornar erro', async function () {
      const res = {};
      const req = {
        params: 1,
        body: [{ quantity: 10 }],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .resolves({
          message: '"productId" is required',
        });
      await salesController.createSale(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required',
      });
    });
    it('Se quantity não for informada, retornar erro', async function () {
      const res = {};
      const req = {
        body: [{ productId: 2 }],
      };
      const next = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await saleValidation(req, res, next);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });
    it('Retornar erro se não for informado o ID', async function () {
      const res = {};
      const req = {
        body: [{ productId: 999, quantity: 1 }],
      };
      const next = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await saleValidation(req, res, next);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('Retornar erro se não for passado algum dado solicitado', async function () {
      const items = [
        {
          productId: 1,
        },
      ];
      sinon.stub(salesModel, 'createSaleId').resolves(1);
      sinon.stub(salesModel, 'createSale').resolves(items[0]);
      const result = await salesService.createSale(items);
      expect(result.message).to.deep.equal('"quantity" is required');
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
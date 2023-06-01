const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(sinonChai);
const { expect } = chai;

const { salesService } = require('../../src/services');
const { salesController } = require('../../src/controllers');
const mockSales = require('../../src/mocks/sales');

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
      
      // const res = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      // res.status = sinon.stub().returns(res);
      // res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSales').resolves({
        id: 3,
        itemsSold: req.body,
      });
      
      // sinon.stub(salesService, 'createSales').resolves(req.body);
  
      await salesController.createSales(req, res);
      expect(res.status).to.have.been.calledWith(201);
expect(res.json).to.have.been.calledWith({
  id: 3,
  itemsSold: req.body,
});
  
      // expect(res.status).to.have.been.calledWith(201);
      // expect(res.json).to.have.been.calledWith({
      //   id: 3,
      //   itemsSold: [
      //     {
      //       productId: 1,
      //       quantity: 1,
      //     },
      //     {
      //       productId: 2,
      //       quantity: 5,
      //     },
      //   ],
      // });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
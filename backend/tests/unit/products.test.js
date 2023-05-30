const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(sinonChai);
const { expect } = chai;

const { productsService } = require('../../src/services');
const { productsController } = require('../../src/controllers');
const mockProducts = require('../../src/mocks/products');

describe('Testando productsController', function () {
  describe('Listagem de todos os produtos', function () {
    it('Retorna todos os produtos e status 200', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves(mockProducts);

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts);
    });
  });
  describe('Produto com o id presente na URL deve ser retornado;', function () {
    it('Retorna o produto buscado e status 200', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves(mockProducts);

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts);
    });
  });
  describe('Teste', function () {
    it('Retorna mensagem product not found e status 404', async function () {
      const res = {};
      const req = { params: { id: 10000 } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(productsService, 'findById')
        .resolves({ message: 'Product not found' });
  
      await productsController.findById(req, res);
  
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
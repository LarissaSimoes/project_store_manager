const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(sinonChai);
const { expect } = chai;

const { productsService } = require('../../src/services');
const { productsController } = require('../../src/controllers');
const mockProducts = require('../../src/mocks/products');
const { productNameValidation } = require('../../src/middlewares/productNameValidation');

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
  describe('Produto com id inexistente deve retornar mensagem e status 404', function () {
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
  describe('Testando inserção de produtos no banco de dados', function () {
    it('Testando endpoint post /products', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      req.body = { name: 'Camisa' };
      sinon.stub(productsService, 'createProduct').resolves(req.body);
  
      await productsController.createProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ name: 'Camisa' });
    });
  });
  describe('Testando o middleware productNameValidation', function () {
    let req;
    let res;
    let next;
  
    beforeEach(function () {
      req = {
        body: {},
      };
  
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      next = sinon.stub();
    });
  
    it('deve retornar status 400 se o name for vazio', function () {
      req.body.name = '';
  
      productNameValidation(req, res, next);
  
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, {
        message: '"name" is required',
      });
      sinon.assert.notCalled(next);
    });
    it('deve retornar status 422 se o name tiver menos de 5 caracteres', function () {
      req.body.name = 'abc';
  
      productNameValidation(req, res, next);
  
      sinon.assert.calledWith(res.status, 422);
      sinon.assert.calledWith(res.json, {
        message: '"name" length must be at least 5 characters long',
      });
      sinon.assert.notCalled(next);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
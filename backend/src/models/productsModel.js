const connection = require('./connection');

const findAll = async () => {
    const [result] = await connection.execute(
      'SELECT * FROM products ORDER BY id ASC',
    );
    return result; 
  };

const findById = async (productId) => {
    const [[result]] = await connection.execute(
      'SELECT * FROM products WHERE id = ? ORDER BY id ASC',
      [productId],
    );
    return result;
  };

module.exports = {
    findAll,
    findById,
};  
const connection = require('./connection');

const findAll = async () => {
    const [result] = await connection.execute(
      `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
      FROM sales_products AS sp
      INNER JOIN sales AS s ON sp.sale_id = s.id
      ORDER BY sale_id ASC, product_id ASC`,
    );
    return result; 
  };

const findById = async (saleId) => {
    const [result] = await connection.execute(
      `SELECT s.date, sp.product_id AS productId, sp.quantity
      FROM sales_products AS sp
      INNER JOIN sales AS s ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sale_id ASC, product_id ASC`,
      [saleId],
    );
    return result;
  };

const createSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (DATE(NOW()))',
  );
  return insertId;
};

const createSale = async (insertId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [insertId, productId, quantity],
  );
  return {
    productId, 
    quantity,
  };
};

module.exports = {
    findAll,
    findById,
    createSaleId,
    createSale,
};  
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

const createSales = async (salesData) => {
    const [{ insertId }] = await connection.execute(`INSERT INTO sales (date) 
    VALUES (CURRENT_TIMESTAMP)`);
    const sales = salesData
    .map(({ productId, quantity }) => connection.execute(`
    INSERT INTO sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`, [insertId, productId, quantity]));
    await Promise.all(sales);
    return insertId;
  };

module.exports = {
    findAll,
    findById,
    createSales,
};  
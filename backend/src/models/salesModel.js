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
    console.log(result);
    return result;
  };

module.exports = {
    findAll,
    findById,
};  
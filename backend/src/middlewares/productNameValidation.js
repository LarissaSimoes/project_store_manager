const isNameEmpty = (name) => !name || name === '' || name === null;

const isNameValid = (name) => name.length >= 5;

const productNameValidation = (req, res, next) => {
    const { name } = req.body;
    if (isNameEmpty(name)) {
        return res.status(400).json({
            message: '"name" is required',
          });
    } 
    if (!isNameValid(name)) {
        return res.status(422).json({
            message: '"name" length must be at least 5 characters long',
          });
    }
    next();
};

module.exports = {
  productNameValidation,
};
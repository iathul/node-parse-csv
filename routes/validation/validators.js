const { query } = require('express-validator')

exports.requestValidation = () => [
  query('customerId').notEmpty().withMessage('is required'),
  query('startDate')
    .optional()
    .isISO8601('yyyy-mm-dd')
    .withMessage('should be in the format YYYY-MM-DD'),
  query('endDate')
    .optional()
    .isISO8601('yyyy-mm-dd')
    .withMessage('should be in the format YYYY-MM-DD')
]

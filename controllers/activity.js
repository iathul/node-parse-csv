const { requestValidation, parseCsvData } = require('../utils/utils')

// Get customer activities
exports.getCustomerActivities = async (req, res) => {
  const { customerId, startDate, endDate } = req.query
  try {
    // Request validation
    const result = requestValidation(req)
    if (result) {
      return res.status(422).json({
        error: result
      })
    }
    // Get customer activities
    let activities = await parseCsvData(customerId, startDate, endDate)
    if (activities.length) {
      return res.status(200).json({
        message: 'Customer activities.',
        data: activities
      })
    } else {
      return res.status(404).json({
        error: 'No activity found.'
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

// Get customer activities
exports.getActivitiesSummery = async (req, res) => {
  const { customerId, startDate, endDate } = req.query
  try {
    // Request validation
    const result = requestValidation(req)
    if (result) {
      return res.status(422).json({
        error: result
      })
    }
    // Get customer activity summery
    let activities = await parseCsvData(customerId, startDate, endDate),
      summery = Object.values(
        activities.reduce((obj, { ProductId, Count }) => {
          if (obj[ProductId] === undefined)
            obj[ProductId] = { ProductId: ProductId, count: parseInt(Count) }
          else obj[ProductId].count = obj[ProductId].count + parseInt(Count)
          return obj
        }, {})
      )
    if (summery.length) {
      return res.status(200).json({
        message: 'Customer activities summery.',
        products: summery
      })
    } else {
      return res.status(404).json({
        error: 'No activity summery found.'
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

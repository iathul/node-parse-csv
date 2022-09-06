const router = require('express').Router()
const {
  getCustomerActivities,
  getActivitiesSummery
} = require('../controllers/activity')
const { requestValidation } = require('./validation/validators')

// Get customer activities
router.get('/customer/activities', requestValidation(), getCustomerActivities)

// Get customer activity summery
router.get(
  '/customer/activities/summery',
  requestValidation(),
  getActivitiesSummery
)

module.exports = router

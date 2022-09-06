const csv = require('csv-parser')
const fs = require('fs')
const moment = require('moment')
const { validationResult } = require('express-validator')

// Request validation
const requestValidation = req => {
  const errors = validationResult(req)
  let message
  if (!errors.isEmpty()) {
    message = `${errors.array()[0].param} ${errors.array()[0].msg}`
  }
  return message
}

// Get ISO format date
const getISODate = date => {
  const dateString = new Date(date)
  return dateString.toISOString()
}

// Compare with dates
const compareDates = (compDate, startDate, endDate) => {
  if (
    moment(getISODate(compDate)).isBetween(startDate, endDate, 'date', "[]") &&
    startDate &&
    endDate
  ) {
    return true
  } else if (
    moment(getISODate(compDate)).isSameOrAfter(startDate) &&
    startDate &&
    !endDate
  ) {
    return true
  } else if (
    moment(getISODate(compDate)).isSameOrBefore(endDate, 'date') &&
    !startDate &&
    endDate
  ) {
    return true
  }
}

// Parse csv data
const parseCsvData = (customerId, startDate, endDate) => {
  let results = []
  return new Promise((resolve, reject) => {
    fs.createReadStream('./data/sampleData.csv')
      .on('error', error => {
        reject(error)
      })
      .pipe(csv())
      .on('data', data => {
        if (!startDate && !endDate) {
          if (data['CustomerId'] === customerId) {
            results.push(data)
          }
        } else {
          if (
            data['CustomerId'] === customerId &&
            compareDates(data['Timestamp'], startDate, endDate)
          ) {
            results.push(data)
          }
        }
      })
      .on('end', () => {
        resolve(results)
      })
  })
}

module.exports = {
  requestValidation,
  parseCsvData
}

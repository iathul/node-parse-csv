require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('<h3> <center> Shopalyst interview task </center> </h3>')
})
app.use('/api', require('./routes/activity'))

// Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server Running at PORT: ${PORT}`))

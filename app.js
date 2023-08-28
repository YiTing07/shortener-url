// import express
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('shortener-url')
})

app.listen(port, (req, res) => {
  console.log(`express server is running on http://localhost:${port}`)
})
// 導入 express、 handlebars
const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

// 設定樣板引擎
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

// 靜態資源
app.use(express.static('public'))



// 設定路由
app.get('/', (req, res) => {
  res.redirect('shortener-url')
})

app.get('/shortener-url', (req, res) => {
  res.render('index')
})



app.listen(port, (req, res) => {
  console.log(`express server is running on http://localhost:${port}`)
})
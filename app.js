// 導入 express、 handlebars
const express = require('express')
const { engine } = require('express-handlebars')
const { nanoid } = require('nanoid')
const axios = require('axios')
const app = express()
const port = 3000

// 設定樣板引擎
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

// 靜態資源
app.use(express.static('public'))

// 解析 POST 的請求內容
app.use(express.urlencoded({extended: false}))

// 設定 URL Database
const urlDatabase = {}
const BASE_URL = 'https://shortener-url/'

// 設定路由
app.get('/', (req, res) => {
  res.redirect('/shortener-url')
})

app.get('/shortener-url', (req, res) => {
  res.render('index')
})

// 取得表單內容，並轉換成短網址
app.post('/shorten', (req, res) => {
  const originalURL = req.body.originalURL
  if(!originalURL) {
    res.render('result',{errorMessage: `Please enter the full URL!`})
    return
  }

  
  // 確認網址是否存在
  axios.get(originalURL)
    .then((response) => {
      if (response.status === 200) {
        // 定義 urlDatabase 現有的網址，以利後續比對，避免重複
        const existingURL = Object.keys(urlDatabase).find((shortURL) => 
        urlDatabase[shortURL] === originalURL
        )

        if(existingURL) {
          res.render('result', {shortURL: `${BASE_URL}${existingURL}`})
        } else {
          const shortURL = nanoid(5)
          urlDatabase[shortURL] = originalURL
          res.render('result', {shortURL: `${BASE_URL}${shortURL}`})
        }
      } 
    })
    .catch((error) => {
      res.render('result', {errorMessage: `Please confirm whether the URL is valid.`})
    })  
})


app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
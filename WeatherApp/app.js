const express = require('express');
const axios = require('axios');
const app = express();

// Встановлюємо EJS як шаблонізатор
app.set('view engine', 'ejs');

// Використовуємо публічну папку для статичних файлів
app.use(express.static('public'));

// Головна сторінка
app.get('/', (req, res) => {
  res.render('index');
});

// Маршрут для отримання погоди в конкретному місті
app.get('/weather/:city', async (req, res) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=5649e24791bfd8916c5f8b0ff40baca6&units=metric`);
    res.render('weather', { weather: response.data });
  } catch (error) {
    res.send(error);
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

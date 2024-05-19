const express = require('express');
const moment = require('moment-timezone');
const app = express();
const PORT = 3000;

// Разрешаем доступ к статическим файлам в каталоге "public"
app.use(express.static('public'));

// Маршрут для получения времени
app.get('/time', (req, res) => {
    const city = req.query.city;
    if (city) {
        const timeZone = {
            "Москва": "Europe/Moscow",
            "Санкт-Петербург": "Europe/Moscow",
            "Новосибирск": "Asia/Novosibirsk",
            "Екатеринбург": "Asia/Yekaterinburg",
            "Нижний Новгород": "Europe/Moscow",
            "Казань": "Europe/Moscow",
            "Челябинск": "Asia/Yekaterinburg",
            "Омск": "Asia/Omsk",
            "Самара": "Europe/Samara",
            "Ростов-на-Дону": "Europe/Moscow"
        };

        const time = moment().tz(timeZone[city]).format('YYYY-MM-DD HH:mm:ss');
        res.json({ time });
    } else {
        res.status(400).json({ error: 'City is required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
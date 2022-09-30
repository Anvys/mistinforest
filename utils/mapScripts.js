const fs = require('fs');
// magick mogrify -format png -gravity south -chop 0x32 *.png
// magick mogrify -format png -gravity east -chop 32x0 *.png
let str = ''
for (let j = 24; j >= 0; j--) {
    for (let i = 0; i < 40; i++) {
        str = str + `World_${i < 10 ? '0' + i : i}_${j < 10 ? '0' + j : j}.png\n`
    }
}
fs.writeFile('image.txt', str, (err) => {
    if (err) throw err;
})
// magick montage -mode concatenate -tile 40x25 @image.txt final.jpg
// vips dzsave ../../../../map2/tmp4/final.jpg xxx --layout google --background 0 --centre

const writeFileNames = (name) =>{
    var files = fs.readdirSync(`./src/icons/${name}`);
    const names = files.map(v=>v.substring(0,v.length-4))
    let namesStr = ''
    for (let i = 0; i < names.length; i++) {
        const isLineBreak = (i>0 && (names[i].split('-')[1] !==names[i-1].split('-')[1]))
        namesStr = namesStr + (`${isLineBreak ? '\n':''}'${names[i]}', `)
    }
    fs.writeFile(`${name}.txt`,namesStr , (err) => {
        if (err) throw err;
    })
}
// writeFileNames('res')
// writeFileNames('comp')
// writeFileNames('other')
// writeFileNames('Event')
writeFileNames('abilities1')
writeFileNames('abilities2')
writeFileNames('abilities3')
writeFileNames('alterations')
writeFileNames('portret')

// Тестовое задание на позицию Full-stack разработчика.
//
//     Реализовать форму регистрации / авторизации, используя связку ReactJS + Laravel.
//
// - Пароль должен содержать символы в разных регистрах, цифры.
// - Проверка и валидация полей.
// - Использовать для авторизации JWT-токен.
//
//     В результате выполненной работы предоставьте ссылку на репозиторий с исходным кодом.

// # Тестовое задание web-программист (React.js)
//
// Нужно разработать таблицу в формате Single Page Application.
//
// **Требования к таблице.**
//
// 1. Таблица должна содержать 4 колонки:
//     1. Дата
// 2. Название
// 3. Количество
// 4. Расстояние
// 2. База данных может быть PostgreSQL
// 3. Таблица должна иметь сортировку по всем полям кроме даты. Фильтрация должна быть в виде двух
// выпадающих списков и текстового поля:
//     1. Выбор колонки, по которой будет фильтрация
// 2. Выбор условия (равно, содержить, больше, меньше)
// 3. Поле для ввода значения для фильтрации
// 4. Таблица должна содержать пагинацию
//
// Вся таблица должна работать без перезагрузки страницы.
//
// **Можно использовать:**
//
// - Возможности node.js
// - React/Axios
// - css библиотеки
//
// **Нельзя использовать:**
//
// - Библиотеки с готовыми компонентами или плагины для React, которые
//
// предоставляют готовый функционал, требуемый в задании
//
// - Библиотеки и плагины для валидации
// - Библиотеки и плагины для работы с БД, ORM
// - CMS системы
//
// **Критерии оценки:**
//
// - Работоспособность согласно ТЗ
// - Архитектура решения
// - Удобство чтения кода и комментарии
// - Удобство проверки (деплой в том числе)
//
// Результат тестового задания необходимо отправить в наш whatsapp ответным сообщением. Ссылка на репозиторий в [https://github.com/](https://github.com/) . Репозиторий должен содержать сам виджет и серверную часть.

// yarn add nodemon ts-node typescript @types/express @types/node -D

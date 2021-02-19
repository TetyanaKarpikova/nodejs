const fs = require('fs');
const path = require('path');

const users = [
    { name: 'olya', gender: 'female', age: 20 },
    { name: 'anna', gender: 'female', age: 25 },
    { name: 'oleg', gender: 'male', age: 28 },
    { name: 'viktor', gender: 'male', age: 26 },
    { name: 'ivan', gender: 'male', age: 32 },
    { name: 'margo', gender: 'female', age: 19 },
    { name: 'andrii', gender: 'male', age: 22 },
    { name: 'oksana', gender: 'female', age: 30 },
    { name: 'alex', gender: 'male', age: 29 },
    { name: 'roman', gender: 'female', age: 19 },
]

users.forEach(user => {
    let filePath = path.join(__dirname, 'lesson1', `${user.name}.json`);
    let data = JSON.stringify(user);

    fs.writeFile(filePath, data, err => {
        if (err) {
            console.log(err);
            return;
        }
    })

})

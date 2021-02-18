const fs = require('fs');
const path = require('path');

let normalPath18 = path.normalize(__dirname + '/1800');

let normalPath20 = path.normalize(__dirname + '/2000')


function moveFile(oldPath, newPath, genderStr) {
    fs.readdir(oldPath, (err, files) => {

        if (err) {
            console.log('________readdir___________________');
            console.log(err);
            console.log('__________________________________');

            return;
        }

        files.forEach(file => {
            let oldPathFile = path.normalize(oldPath + '/' + file);
            let newPathFile = path.normalize(newPath + '/' + file);
            fs.readFile(oldPathFile, (err, data) => {
                if (err) {
                    console.log('___________readFile_________________');
                    console.log(err);
                    console.log('________________________________');

                    return;
                }

                let { gender } = JSON.parse(data);
                if (gender === genderStr) {
                    fs.rename(oldPathFile, newPathFile, err => {
                        if (err) {
                            console.log('_____________rename_________________');
                            console.log(err);
                            console.log('________________________________');

                            return;

                        }
                    })

                }
            })
        })
    });

}

moveFile(normalPath18, normalPath20, 'male');
moveFile(normalPath20, normalPath18, 'female');

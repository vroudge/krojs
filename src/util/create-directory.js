import fs from 'fs';

export default (directory, path) => {
    return new Promise(function (resolve, reject) {
        fs.mkdir(directory, function (e) {
            if (!e) {
                return resolve({ path });
            } else {
                return reject(e);
            }
        });
    });
}

import path from 'path';
import ncp from 'ncp';
import streamReplace from 'stream-replace';

ncp.limit = 16;

export default (srcPath, destPath, replacements = []) => {
    const kroSource = `${path.resolve(path.dirname(require.main.filename), '..')}/templates/${srcPath}`;

    //noinspection JSUnusedGlobalSymbols
    const opts = {
        transform: (read, write) => {
            if (replacements.length > 0) {
                let readingPipe = read;

                replacements.forEach((elem) => {
                    const regex = new RegExp('\\' + `${elem.label}`, 'gi');
                    readingPipe = readingPipe.pipe(streamReplace(regex, elem.value))
                });

                readingPipe.pipe(write);
            } else {
                read.pipe(write);
            }
        },
    };

    return new Promise(function (resolve, reject) {
        ncp(kroSource, destPath, opts, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

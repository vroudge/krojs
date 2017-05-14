import childProcess from 'child_process';

export default (command) => {
    return new Promise(function(resolve, reject){
        childProcess.exec(command, function(err, stdout, stderr){
            if(err) return reject(err);
            return resolve(stdout);
        });
    });
};

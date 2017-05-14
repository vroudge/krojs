import createApp from './create-app';
import program from 'commander';
import output from './util/output';

program
    .usage('[ app / model]')
    .option('n, --noinstall ', 'do not install npm packages')
    .parse(process.argv);

const objectToCreate = program.args;
console.log(objectToCreate);
console.log(program);


if (objectToCreate.length === 0) {
    output('You did not provide the krojs object you want to create.', true);
    program.outputHelp((txt) => {
        return txt;
    });
    process.exit(0);
} else if (objectToCreate[0] === 'app') {
    createApp({ installPackages: !program.noinstall });
}

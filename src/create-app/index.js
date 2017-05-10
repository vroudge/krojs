import prompt from '../util/prompt';
import output from '../util/output';
import createDirectory from '../util/create-directory';
import createGitRepository from '../util/create-git-repo';


const appSchema = {
    properties: {
        appName: {
            description: `Enter your Kro App name`,
            type: 'string',
            pattern: /[\-a-zA-Z]+/g,
            message: 'App name must be letters',
            default: 'my-kro-app',
            required: true
        },
        createGitRepo: {
            description: `Do you want to init a git repository in this app`,
            type: 'string',
            pattern: /[yn]|(yes)|(no)/g,
            message: 'y/n?',
            default: 'y',
            required: true,
            before: (value) => value==='y' || value==='yes',
        }
    }
};

export default () => {
    let path, createGit, app;

    prompt.start();

    cliPrompt(appSchema)
        .then(({ appName, createGitRepo }) => {

            path = `${process.cwd()}/${appName}`;
            app = appName;
            createGit = createGitRepo;

            const brewingList = [createDirectory(app, path)];

            if(createGitRepo){
                brewingList.push(createGitRepository(path));
            }
            return Promise.all(brewingList);
        })
        .then(() => {
            output(`Served a fresh ${app} at ${path}`);

            if(createGit){
                output(`With a fizzy git repository`);
            }
        })
        .catch(console.error);
}

const cliPrompt = (schema) => {
    return new Promise((resolve, reject) => {
        prompt.get(schema, function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        })
    });
};

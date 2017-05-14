import prompt from '../util/prompt';
import output from '../util/output';

import createDirectory from '../util/create-directory';
import createGitRepository from '../util/create-git-repo';
import copyTemplate from '../util/copy-directory';
import runCommand from '../util/run-command';

import kroPackage from '../../package.json';

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
            before: (value) => value === 'y' || value === 'yes',
        }
    }
};

export default async({ installPackages = true }) => {
    let path, createGit, app;

    prompt.start();
    await Promise.resolve();

    const { appName, createGitRepo } = await cliPrompt(appSchema);

    path = `${process.cwd()}/${appName}`;
    app = appName;
    createGit = createGitRepo;

    const brewingList = [createDirectory(app, path)];

    if (createGitRepo) {
        brewingList.push(createGitRepository(path));
    }

    await Promise.all(brewingList);

    const templateStringReplacements = [{
        label: '$appName',
        value: app
    }, {
        label: '$kroVersion',
        value: kroPackage.version
    }];

    await copyTemplate('template-app', path, templateStringReplacements);

    output(`Served a fresh ${app} at ${path}`);

    if (createGit) {
        output(`With a fizzy git repository`);
    }

    if (installPackages) {
        await runCommand(`mkdir -p ./${app}/node_modules`);
        output('Adding deez tasty node_modules...');
        await runCommand(`npm --prefix ./${app} install ./${app}`);
    }

    output('Done at last! Type \'make start\' to start the server.')
}

const cliPrompt = (schema) => {
    return new Promise((resolve, reject) => {
        prompt.get(schema, function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        })
    });
};

import nodeGit from 'nodegit'

export default (path) => {
    return nodeGit.Repository.init(path, 0)
        .catch(function (err) {
            console.log(err);
        });
}

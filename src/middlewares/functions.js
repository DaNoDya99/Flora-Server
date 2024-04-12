module.exports = {
    generateIds: (prefix) => {
        return prefix + '-' + Math.floor(1000+Math.random()*9000)+'-'+Math.floor(1000+Math.random()*9000)+'-'+Math.floor(1000+Math.random()*9000);
    }
}
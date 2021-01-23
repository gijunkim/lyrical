const nicknameRegExp = new RegExp('[a-z0-9\-]/i');

const nickname = 'chris Evance';

console.log(nickname.replace(/[ _]/gi, "-").replace(/[^a-z0-9\-]/gi,"").toLowerCase());
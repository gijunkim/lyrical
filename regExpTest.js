const nicknameRegExp = new RegExp('[a-z0-9\-]/i');

const nickname = 'chris Evance';

console.log(nickname.match(/[^a-z0-9\-]/i));
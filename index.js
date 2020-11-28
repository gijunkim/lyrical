const express = require("express");
const cookieParser =require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const pageRouter = require('./routes/page');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const cors = require('cors');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 8081);
/*
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
*/
// TODO: change force to false
sequelize.sync({ force: false })
.then(() => {
    console.log("데이터베이스 연결 성공");
})
.catch((err) => {
    console.log(err);
});


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/', pageRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 400;
    next(error);
});

// 에러 router
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({'error': '에러 router'});
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
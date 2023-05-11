require('dotenv').config();

const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

// development keys
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'something',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        post: 587,
        secure: false,
        auth: {
            user: 'kritie.codingninjas@gmail.com',
            // gmail does not allow third party apps to send mail, hence created app key for nodemailer and used in place of password.
            pass: 'gfqptqrbjsphglpg'

        }
    },
    google_client_id: "154342273057-q7k7jq5657o47gc01cna8420lfvhinhi.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }

}

// production keys
const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        post: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            // gmail does not allow third party apps to send mail, hence created app key for nodemailer and used in place of password.
            pass: process.env.CODEIAL_GMAIL_PASSWORD

        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }

}


module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
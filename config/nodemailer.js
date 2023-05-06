const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,
    auth: {
        user: 'kritie.codingninjas@gmail.com',
        // gmail does not allow third party apps to send mail, hence created app key for nodemailer and used in place of password.
        pass: 'gfqptqrbjsphglpg'

    }
});

// for rendering template
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) { console.log('Error in rendering template', err); return; }

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}



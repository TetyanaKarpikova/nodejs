const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const errorMessage = require('../error/error.messages');
const { ROOT_EMAIL_PASSWORD, ROOT_EMAIL } = require('../config/config');
const templateInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const singleTemplateInfo = templateInfo[action];

        if (!singleTemplateInfo) {
            throw new Error(errorMessage.WRONG_MAIL_ACTION);
        }

        const html = await templateParser.render(singleTemplateInfo.templateName, context);

        return transporter.sendMail({
            from: 'NO REPLAY',
            to: userMail,
            subject: singleTemplateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};

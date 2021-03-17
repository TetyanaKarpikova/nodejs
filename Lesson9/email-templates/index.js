const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },

    [emailActionsEnum.DELETE_EMAIL]: {
        templateName: 'deleteMail',
        subject: 'Your email was deleted'
    },

    [emailActionsEnum.USER_BLOCKED]: {
        templateName: 'xxx',
        subject: 'Your account was blocked'
    },

    [emailActionsEnum.PASSWORD_CHANGED]: {
        templateName: 'zzz',
        subject: 'Password was changed'
    }
};

/**
 * Created by watcher on 11/1/16.
 */
Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://jeka:1212wwqq@smtp.sendgrid.net:587';
    // process.env.MAIL_URL = 'smtp://kella:1212wwqq@smtp.sendgrid.net:587';
});
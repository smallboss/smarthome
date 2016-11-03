/**
 * Created by watcher on 11/1/16.
 */
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

if(Meteor.isServer) {
    Accounts.emailTemplates.siteName = "uKNX";
    Accounts.emailTemplates.from = "uKNX Admin service@uknx.com>";
    /*templates for verifyEmail start*/
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return "Welcome to uKNX, " + user.profile.name;
    };
    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
        return "<div><span>Click </span><a target='_blank' href='" + url + "'>here</a><span> to confirm this email</span></div>";
    };
    /*templates for verifyEmail end*/
    Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
    Accounts.onCreateUser(function (options, user) {
        if(options.profile) {
            user.profile = options.profile
        } else {
            user.profile = {
                name: 'Name User'
            }
        }
        return user
    })
    Accounts.validateNewUser((user) => {
        new SimpleSchema({
            _id: { type: String },
            emails: { type: Array },
            'emails.$': { type: Object },
            'emails.$.address': { type: String },
            'emails.$.verified': { type: Boolean },
            createdAt: { type: Date },
            services: { type: Object, blackbox: true },
            profile: {type: Object},
            'profile.name': {type: String}
        }).validate(user);

        // Return true to allow user creation to proceed
        return true;
    });
}
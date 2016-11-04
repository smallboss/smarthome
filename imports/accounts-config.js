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
    //Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
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
    /*Accounts.validateNewUser((user) => {
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
*/
    ServiceConfiguration.configurations.upsert(
        {service: 'facebook'},
        {
            $set: {
                clientId: '1337012049650950',
                loginStyle: "popup",
                secret: 'eda47ba3d69e8a7fadfb046d611ea354'                
            }
        }
    )
    ServiceConfiguration.configurations.upsert(
        {service: 'google'},
        {
            $set: {
                clientId: '776483120777-9mirqrqlqiasi85ed117k3n2btt59m7r.apps.googleusercontent.com',
                loginStyle: "popup",
                secret: 'HE-uFwAgN7H2pBJyqVw-fUVL'
            }
        }
    )
    //ServiceConfiguration.configurations.remove({service: 'twitter'})
    ServiceConfiguration.configurations.upsert(
        {service: 'twitter'},
        {
            $set: {
                consumerKey: 'gWtDZn9v2PqfPvWv79GMNnB8z',
                loginStyle: "popup",
                secret: '14kxEjTqvB7nJLCpC6ia3oo85f9gNkulPwfmh3GXDmvwg8Uhd9'
            }
        }
    )
}
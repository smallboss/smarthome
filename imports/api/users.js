/**
 * Created by watcher on 11/1/16.
 */
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

if(Meteor.isServer) {
    //Meteor.users.remove({})
    //console.log(Meteor.users.find().fetch())
    //console.log('')
    Meteor.methods({
        createNewUser: function (user) {
            let _id = Accounts.createUser(user)
            if(_id) {
                Accounts.sendVerificationEmail(_id)                
            } else {
                return null
            }
        },
        restorePassword: function (email) {
            let finder = Accounts.findUserByEmail(email)
            if(!finder) {
                return 'Cann`t find this email'
            } else {
                Accounts.sendResetPasswordEmail(finder._id, email)
                return 'Email with reset-password-link was sent to ' + email
            }
        }
    })
    if(!Meteor.users.find().count()) {
        let options = {
            username: 'admin',
            password: 'qqqqqq',
            email: 'admin@localhost.com',
            profile: {
                name: 'Main Admin'
            }
        }
        Accounts.createUser(options)
    }    
}
/**
 * Created by watcher on 11/1/16.
 */
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

if(Meteor.isServer) {
    //Meteor.users.remove({})
    if(!Meteor.users.find().count()) {
        let options = {
            username: 'admin',
            password: 'qqqqqq',
            email: 'admin@localhost.com'
        }
        Accounts.createUser(options)
    }    
}
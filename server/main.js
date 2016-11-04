import { Meteor } from 'meteor/meteor';
import '/imports/accounts-config'
import '/imports/api/users'
import './smtp'

Meteor.startup(() => {
  // code to run on server at startup
});

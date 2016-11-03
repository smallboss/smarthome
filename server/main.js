import { Meteor } from 'meteor/meteor';
import '/imports/api/users'
import '/imports/accounts-config'
import './smtp'

Meteor.startup(() => {
  // code to run on server at startup
});

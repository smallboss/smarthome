/**
 * Created by watcher on 11/3/16.
 */
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

if(Meteor.isClient) {
    Template.registerHelper('currentUser', () => {
        return Meteor.user()
    })
    Template.loginForm.events({
        'submit form': (event) => {
            event.preventDefault()
            let loginEmail = event.target.loginEmail.value,
                loginPassword = event.target.loginPassword.value
            if(loginEmail.length < 6 || loginPassword.length < 6) {
                alert('Not valid email or password')
                return 
            }
            Meteor.loginWithPassword(loginEmail, loginPassword, (err) => {
                if(!err) {
                    Meteor.loggingIn()
                    document.location.href = '/dashboard'
                } else {
                    alert('Incorrect data to Login')
                }
            })
        }
    })
    Template.loginForm.events({
        'click #loginFacebook': (event) => {
            event.preventDefault()
            Meteor.loginWithFacebook({}, (err) => {
                if(err) {
                    alert(err.reason)
                } else {
                    document.location.href = '/dashboard'
                }
            })            
        }        
    })
    Template.loginForm.events({
        'click #loginGoogle': (event) => {
            event.preventDefault()
            Meteor.loginWithGoogle({}, (err) => {
                if(err) {
                    alert(err.reason)
                } else {
                    document.location.href = '/dashboard'
                }
            })
        }        
    })
    Template.loginForm.events({
        'click #loginTwitter': (event) => {
            event.preventDefault()
            Meteor.loginWithTwitter({}, (err) => {
                if(err) {
                    alert(err.reason)
                } else {
                    document.location.href = '/dashboard'
                }
            })
        }        
    })
    Template.loginForm.events({
        'click #restorePassword': (event) => {
            event.preventDefault()
            $('.restore-password').toggle()            
        }
    })
    Template.loginForm.events({
        'click #getRestorePassword': (event) => {
            let email = event.target.form.emailToRestore.value
            Meteor.call('restorePassword', email, function (err, result) {
                alert(result)                
            })            
        }
    })
    /*
    Template.loginForm.onRendered(function () {
        console.log(this)
    })
    */
}
/**
 * Created by watcher on 10/31/16.
 */
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

if(Meteor.isClient) {
    Router.configure({
        layoutTemplate: 'layout'
    })
    Router.route('/', function() {this.render('dashboard')})
    Router.route('/registerCongratulations', function() {this.render('registerCongratulations')})
    Router.route('/dashboard', function () {this.render('dashboard')})
    Router.route('/devicesAll', function () {this.render('devicesAll')})
    Router.route('/projectsAll', function () {this.render('projectsAll')})
    Router.route('/projectsAddNew', function () {this.render('projectsAddNew')})
    Router.route('/projectsDevices', function () {this.render('projectsDevices')})
    Router.route('/projectsUsers', function () {this.render('projectsUsers')})
    Router.route('/projectsPages', function () {this.render('projectsPages')})
    Router.route('/projectsScenes', function () {this.render('projectsScenes')})
    Router.route('/devicesAddNew', function () {this.render('devicesAddNew')})
    Router.route('/logout', function () {
        Meteor.logout()
        document.location.href = '/'
    })
    Router.route('/*', function () {this.render('Not Found')})

    Router.onAfterAction(function () {
        var title = ''

        switch(this.route.path()) {
            case '/':
                title = 'Home'
                break
            case '/registerCongratulations':
                title = 'Successful verify email'
                break
            case '/dashboard':
                title = 'Home'
                break
            case '/devicesAll':
                title = 'All devices'
                break
            case '/projectsAll':
                title = 'All projects'
                break
            default:
                title = 'Title'
                break
        }
        document.title = title
    })
    
    Accounts.onEmailVerificationLink(function (token, done) {
        Accounts.verifyEmail(token, (err) => {
            if(err) {
                alert(err)
            } else {
                document.location.href = '/registerCongratulations'
            }
        })        
    })
    
    
}
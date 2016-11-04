/**
 * Created by watcher on 11/4/16.
 */
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

if(Meteor.isClient) {
    Template.registrationForm.events({
        'submit form': (event) => {
            event.preventDefault()
            let userName = event.target.registerName.value,
                email = event.target.registerEmail.value,
                password = event.target.registerPassword.value,
                repeatPassword = event.target.repeatPassword.value,
                newUser = {}
            if(password !== repeatPassword){
                alert('Password from repeat must match password')
                return
            }
            if(userName.length > 30) {alert('Name`s length must be less then 30 symbols'); return}
            if(userName.length <  3) {alert('Name`s length must be over then 3 symbols'); return}
            if(password.length < 6) {alert('Password length must be over then 6 symbols'); return}
            if(email.length > 30) {alert('Email`s length must be less then 30 symbols'); return}
            if(email.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/g)) {alert('Not valid email'); return}
            newUser = {
                username: email,
                email,
                password,
                profile: {
                    name: userName
                }
            }
            Meteor.call('createNewUser', newUser, function (err) {
                if(err) {
                    alert(err.reason)
                } else {
                    alert('Successful registration. Please, check your email')
                    document.location.href = '/'
                }
            })
        }
    })
}
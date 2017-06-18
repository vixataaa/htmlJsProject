import {templateLoader} from 'templateLoader';
import {passHashGenerator} from 'passHashGenerator';
import {genericRequester} from 'genericRequester';
import {userValidator} from 'userValidator';
import toastr from 'toastr';

const userController = function () {
    function isUserLogged() {
        return localStorage.getItem('username') && localStorage.getItem('userId');
    }

    function displayRegisterPage() {
        Promise
            .resolve(templateLoader().loadTemplate('register'))
            .then((template) => {
                $('#app-container').html(template);
            })
            .then(() => {
                $('#register-btn')
                    .on('click', function (ev) {

                        const username = $('#username-field')
                            .val()
                            .trim();
                        const password = $('#pwd')
                            .val()
                            .trim();
                        const confirmedPassword = $('#pwd-confirm')
                            .val()
                            .trim();

                        try {
                            userValidator().validateUsername(username);
                            userValidator().validatePassword(password);
                            userValidator().validatePassword(confirmedPassword);
                            userValidator().validatePasswordMatching(password, confirmedPassword);
                        } catch (err) {
                            toastr.error(err.message);
                        }

                        registerUser(username, password).then(responseSuccess => {
                            localStorage.setItem('username', responseSuccess.username);
                            localStorage.setItem('userId', responseSuccess.userId);

                            $('#register-nav').css('display', 'none');
                            $('#login-nav').css('display', 'none');
                            $('#logout-nav').css('display', '');
                            $('#logged-user-nav').css('display', '');                             
                            $('#logged-user-nav').children().html('Logged in as: ' + localStorage.getItem('username'));

                            toastr.success('Registered.');

                        }, rejection => {
                            const response = rejection.responseJSON;

                            toastr.error(response);
                        });

                    location.hash = '!/home';                   
                        
                    });
            });
    }
    ///

    function displayLoginPage() {
        Promise
            .resolve(templateLoader().loadTemplate('login'))
            .then((template) => {
                $('#app-container').html(template);
            })
            .then(() => {
                $('#login-btn')
                    .on('click', function (ev) {
                        const username = $('#username-field')
                            .val()
                            .trim();
                        const password = $('#pwd')
                            .val()
                            .trim();

                        try {
                            userValidator().validateUsername(username);
                            userValidator().validatePassword(password);

                            loginUser(username, password).then(responseSuccess => {
                                localStorage.setItem('username', responseSuccess.username);
                                localStorage.setItem('userId', responseSuccess.userId);

                                $('#register-nav').css('display', 'none');
                                $('#login-nav').css('display', 'none');
                                $('#logout-nav').css('display', '');
                                $('#logged-user-nav').css('display', '');                             
                                $('#logged-user-nav').children().html('Logged in as: ' + localStorage.getItem('username'));

                                toastr.success('Welcome, ' + username + '!');
                            }, rejection => {
                                const response = rejection.responseJSON;
                                toastr.error(response);
                            });
                        } catch (err) {
                            toastr.error(err.message);
                        }

                        location.hash = '!/home';
                    });
            });
    }

    function registerUser(username, password) {
        // VALIDATIONS
        const user = {
            username: username,
            passHash: passHashGenerator().generateHash(username + password)
        };

        return genericRequester().post('api/users', user);
    }

    function loginUser(username, password) {
        // VALIDATIONS
        const user = {
            username: username,
            passHash: passHashGenerator().generateHash(username + password)
        };

        return genericRequester().put('api/users', user);
    }
    
    (function attachLogoutEvent() {
        $('#logout-nav')
            .on('click', function (ev) {
                console.log('clicked logout');

                localStorage.removeItem('username');
                localStorage.removeItem('userId');

                $('#logout-nav').css('display', 'none');
                $('#login-nav').css('display', '');
                $('#register-nav').css('display', '');
                $('#logged-user-nav').css('display', 'none');                             
                $('#logged-user-nav').children().html();
            });
    }());

    return {
        displayRegisterPage: displayRegisterPage, 
        displayLoginPage: displayLoginPage,
        isUserLogged : isUserLogged
    };
};

export {userController};
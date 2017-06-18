import {userController} from 'userController';
import {postController} from 'postController';
import Navigo from 'navigo';
import 'jquery';

(function handleNavbarUser() {
    if (localStorage.getItem('username') && localStorage.getItem('userId')) {
        $('#register-nav').css('display', 'none');
        $('#login-nav').css('display', 'none');
        $('#logged-user-nav').css('display', '');                             
        $('#logged-user-nav').children().html('Logged in as: ' + localStorage.getItem('username'));
    } else {
        $('#logout-nav').css('display', 'none');
        $('#logged-user-nav').css('display', 'none');                             
        $('#logged-user-nav').children().html();
    }
}());

(function attachLogoutEvent() {
    $('#logout-nav').on('click', function(ev) {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        
        $('#logout-nav').css('display', 'none');
        $('#logged-user-nav').css('display', 'none');                             
        $('#logged-user-nav').children().html();
        $('#login-nav').css('display', '');
        $('#register-nav').css('display', '');
    });
}())

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

router
    .on('/register', function() {
        userController().displayRegisterPage();
    })
    .on('/login', function() {
        userController().displayLoginPage();
    })
    .on('/add', function() {
        postController().displayPostAddingPage();
    })
    .on('/posts/:postId', function(params) {
        postController().displayPostDetailsPage(params.postId);
    })
    .on('/', function() {
        postController().displayHomePage();
    })
    .on('/home', function() {
        postController().displayHomePage();
    })
    .resolve();


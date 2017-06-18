const userValidator = function() {
    function validateUsername(username) {
        if(username.length < 6) {
            throw new Error('Username must be atleast 6 characters long');
        }
    }

    function validatePassword(password) {
        if(password.length < 1) {
            throw new Error('Password cannot be empty');
        }
    }

    function validatePasswordMatching(pass, passConfirm) {
        if(pass !== passConfirm) {
            throw new Error('Passwords must match.');
        }
    }

    return {
        validateUsername : validateUsername,
        validatePassword : validatePassword,
        validatePasswordMatching : validatePasswordMatching
    };
};

export { userValidator };
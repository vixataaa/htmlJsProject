SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script
        'app': '/js/app.js',
        // Libraries
        'jquery' : '/libs/jquery/dist/jquery.js',
        'bootstrap': '/libs/bootstrap/dist/js/bootstrap.js',
        'handlebars': '/libs/handlebars/dist/handlebars.js',
        'navigo': '/libs/navigo/lib/navigo.js',
        'toastr': '/libs/toastr/package/toastr.js',
        // Custom
        'userController': '/js/controllers/userController.js',
        'postController': '/js/controllers/postController.js',
        'templateLoader': '/js/utils/templateLoader.js',
        'genericRequester': '/js/requesters/genericRequester.js',
        'passHashGenerator' : '/js/utils/passHashGenerator.js',
        'userValidator' : '/js/utils/userValidator.js',
        'postValidator' : '/js/utils/postValidator.js'
    }
});
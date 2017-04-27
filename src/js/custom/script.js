jQuery(document).ready(function($) {
    // main vars
    var templates = {
        'about': 'templates/about.html',
        'settings': 'templates/settings.html',
        'login': 'templates/login.html'
    }
    // obj vars
    var mainContainer = $('.container');
    var loginBtn = $('#loginBtn');
    if (mainContainer[0]) {
        mainContainer.load(templates['login']);
    }

});

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
    var mainBody = $('body');

    if (mainContainer[0]) {
        mainContainer.load(templates['login'],function(){
          mainBody.addClass('login');
          loginBtn = $('#loginBtn');
        });
        //add the login class to the body to style the login page
        }
    }


});

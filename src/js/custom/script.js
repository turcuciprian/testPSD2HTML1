jQuery(document).ready(function($) {
    // main vars
    var templates = {
        'about': 'templates/about.html',
        'settings': 'templates/settings.html',
        'login': 'templates/login.html'
    }
    // obj vars
    var mainContainer = $('.container');
    var mainBody = $('body');

    if (mainContainer[0]) {
        mainContainer.load(templates['login'],function(){
          mainBody.addClass('login');
          loginBtn = $('#loginBtn');
          if(loginBtn[0]){
            loginBtn.click(function(){
              mainContainer.load(templates['about'],function(){
                mainBody.removeClass('login');
                console.log('about loaded');
              });
            });
          }
        });
        //add the login class to the body to style the login page
        }
});

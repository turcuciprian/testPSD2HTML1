jQuery(document).ready(function($) {
  $.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});
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
              });
            });
          }
        });
        //add the login class to the body to style the login page
        }
});

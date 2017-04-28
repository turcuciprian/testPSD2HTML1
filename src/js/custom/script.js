jQuery(document).ready(function($) {
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });
    var hash, path,logOut;

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
        // custom made basic routing


        function reloadFunc() {
          //getting the url hash
          hash = $(location).attr('hash');
          //checking the hash value and acting on it
          switch (hash) {
              case '#about':
                  path = templates['about'];
                  break;
              case '#settings':
                  path = templates['settings'];
                  break;
              default:
                  path = templates['login'];
                  mainBody.addClass('login');
                  break;
          }

          mainContainer.load(path, function() {
              loginBtn = $('#loginBtn');
              logOut = $('button.logOut');
              if (loginBtn[0]) {
                mainBody.addClass('login');
                  loginBtn.click(function() {
                      logOut = $('button.logOut');
                      path = templates['about'];
                      $(location).attr('hash', '#about');
                      mainContainer.load(path, function() {
                          mainBody.removeClass('login');
                      });
                  });
              }
              //logout button
              if (logOut[0]) {
                console.log('yep!');
                  logOut.click(function() {
                      $(location).attr('host');
                      path = templates['login'];
                      reloadFunc();


                  });
              }
          });
        }
        //first initialization
        reloadFunc();

        //add the login class to the body to style the login page
    }
});

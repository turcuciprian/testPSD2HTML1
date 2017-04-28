jQuery(document).ready(function($) {
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });
    var hash, path, logOut, profileInfo;
    profileInfo = [{
            'value': 'John Doe',
            'type': 'Name',
            'icon': '',
        },
        {
            'value': 'www.seller.com',
            'type': 'Website Url',
            'icon': 'ion-android-globe',
        },
        {
            'value': '(949) 325 - 68594',
            'type': 'Phone Number',
            'icon': 'ion-ios-telephone-outline',
        },
        {
            'value': 'NewPort Beach, CA',
            'type': 'City, state & Zip',
            'icon': 'ion-ios-home-outline',
        },
    ];

    // main vars
    var templates = {
        'about': 'templates/about.html',
        'settings': 'templates/settings.html',
        'login': 'templates/login.html'
    }
    // obj vars
    var mainContainer = $('.container');
    var globalHeader = $('.header');
    var mainBody = $('body');

    if (mainContainer[0]) {
        //event for when the hash of the url changes
        $(window).on("hashchange", hashChanged);

        function hashChanged() {
            reloadFunc();
        }



        function reloadFunc() {

            //getting the url hash
            hash = $(location).attr('hash');
            //checking the hash value and acting on it
            mainBody.removeClass('login');
            // custom made basic routing
            switch (hash) {
                case '#about':
                    path = templates['about'];
                    break;
                case '#settings':
                    path = templates['settings'];
                    break;
                case '#':
                default:
                    path = templates['login'];
                    mainBody.addClass('login');
                    break;
            }

            mainContainer.load(path, function() {
                //load just the header
                globalHeader = $('.header');
                if (globalHeader[0]) {
                    globalHeader.load('templates/header.html', function() {
                        var ulMenu = $('.menu ul');
                        if (ulMenu[0]) {
                            ulMenu.find('li a').removeClass('selected');
                            switch (hash) {
                                case '#about':
                                    ulMenu.find('.about a').addClass('selected');
                                    // generate the data for the profile
                                    generateProfile();
                                    break;
                                case '#settings':
                                    ulMenu.find('li.settings a').addClass('selected');
                                    break;
                                case '#':
                                default:
                                    break;
                            }
                        }
                    });
                }

                loginBtn = $('#loginBtn');
                logOut = $('button.logOut');

                //logout button
            });
        }
        function generateProfile(){

        }
        //first initialization
        reloadFunc();

        //add the login class to the body to style the login page
    }
});

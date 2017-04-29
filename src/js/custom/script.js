jQuery(document).ready(function($) {
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });
    var hash, path, logOut, profileInfo, ttClickedInd;
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

        function generateProfile() {
            var profileObj = $('.baseContent ul');
            var profileCntObj;
            if (profileObj[0]) {
                profileCntObj = $(profileObj.html()); //create a object from the basecontent contents html
                profileObj.html(''); //clear contents of profileObj
                $.each(profileInfo, function(index, value) {
                    var tempObj = profileCntObj;
                    tempObj.find('span').html(value['value']); //Adding the content Title
                    tempObj.find('i').not('a i').removeClass().addClass('icon'); //setting the icon
                    tempObj.find('i').not('a i').addClass(value['icon']); //setting the icon

                    profileObj.append('<li>' + tempObj.html() + '</li>');
                });
                tooltipFunc();
            }

        }

        function tooltipFunc() {
            var tooltip = $('.tooltip');
            //tooltip appear for when item is clicked
            var clickableItem = $('.baseContent ul li a');
            var listItem = $('.baseContent ul li');
            if (clickableItem[0]) {
                clickableItem.on('click', function(event) {
                    var tThis = $(this);
                    var clickedIndex = tThis.parent('li').index(); //which index of the li element was clicked
                    event.stopPropagation();
                    tooltip.addClass('show');
                    var thisOffset = tThis.offset();
                    var xTop = thisOffset.top;
                    var xLeft = thisOffset.left;
                    tooltip.css('top', xTop - 10);
                    tooltip.css('left', xLeft + 'px');

                    populateTooltip(clickedIndex);
                });
            }
            mainBody.on('click', function() {
                tooltip.removeClass('show');
            });
        }

        function populateTooltip(cIndex) {
            ttClickedInd = cIndex;
            var tooltip = $('.tooltip');
            console.log(profileInfo[cIndex]);
            tooltip.find('label').html(profileInfo[cIndex]['type']);
            tooltip.find('input').val(profileInfo[cIndex]['value']);
        }
        //first initialization
        reloadFunc();

        //add the login class to the body to style the login page
    }
});

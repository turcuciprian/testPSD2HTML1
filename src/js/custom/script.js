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
    var tooltip = $('.tooltip');
    var mainContainer = $('.container');
    var globalHeader = $('.header');
    var mainBody = $('body');
    var options = $('.baseContent h3 .options');


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
                                    mobileFunc();
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
            tooltip = $('.tooltip');
            //tooltip appear for when item is clicked
            var clickableItem = $('.baseContent ul li a');
            var listItem = $('.baseContent ul li');
            if (clickableItem[0]) {
                clickableItem.on('click', function(event) {
                    var tThis = $(this);
                    var clickedIndex = tThis.parent('li').index(); //which index of the li element was clicked
                    tooltip.addClass('show');
                    var thisOffset = tThis.offset();
                    var xTop = thisOffset.top;
                    var xLeft = thisOffset.left;
                    tooltip.css('top', xTop - 10);
                    tooltip.css('left', xLeft + 'px');

                    populateTooltip(clickedIndex);

                    //events for save and cancel
                    var ttSave = $('.tooltip button#tSave');
                    var ttCancel = $('.tooltip button#tCancel');

                    if (ttSave[0]) {
                        ttSave.click(function() {
                            profileInfo[clickedIndex]['value'] = tooltip.find('input').val();

                            generateProfile();
                            closeTt();
                        });
                        ttCancel.click(function() {
                            //clearing the tooltip
                            closeTt();
                        });
                    }
                });
            }
        }

        function populateTooltip(cIndex) {
            ttClickedInd = cIndex;
            tooltip = $('.tooltip');
            tooltip.find('label').html(profileInfo[cIndex]['type']);
            tooltip.find('input').val(profileInfo[cIndex]['value']);
        }

        function closeTt() {
            tooltip = $('.tooltip');
            ttClickedInd = null;
            tooltip.removeClass('show');

        }

        function mobileFunc() {
            var butt = $('#mProfEditButt');
            var pai = $('.baseContent h3 a'); //profile link i
            options = $('.baseContent h3 .options');
            //options objs
            var oSave = $('.options a#oSave');
            var oCancel = $('.options a#oCancel');
            if (oSave[0]) {
                oSave.click(function() {
                    mobProfSave();
                    pToggle(false);
                    generateProfile();
                });
            }
            if(oCancel[0])
            oCancel.click(function(){
              pToggle(false);

            });


            if (butt[0]) {
                butt.click(function() {
                    pToggle();

                    //populate input fields with array data
                    var inputs = $('#mProfEdit p input');

                    $.each(inputs, function(index, item) {
                        var thisItem = $(item);
                        if (profileInfo[index]) {
                            var tempVal = profileInfo[index]['value'];
                            switch (index) {
                                case 0:
                                    tempVal = profileInfo[index]['value'].split(" ")[0];
                                    break;
                                case 1:
                                    index--;
                                    tempVal = profileInfo[index]['value'].split(" ")[1];
                                    break;
                                default:
                                    index--;
                                    tempVal = profileInfo[index]['value'];

                                    break;

                            }
                            thisItem.val(tempVal);
                        }


                    })

                });
            }

        }

        function mobProfSave() {
            var firstName = $('#pFirstName');
            var lastName = $('#pLastName');
            var website = $('#pWebsite');
            var phone = $('#pPhone');
            var location = $('#pLocation');

            profileInfo[0]['value'] = firstName.val() + ' ' + lastName.val();
            profileInfo[1]['value'] = website.val();
            profileInfo[2]['value'] = phone.val();
            profileInfo[3]['value'] = location.val();

            if (options[0]) {
                options.addClass('hidden');
            }
        }

        function pToggle(show) {
            var tThis = $('.baseContent h3 a');
            var hContainer = $('#mProfEdit');
            var pUL = $('.baseContent ul');
            options = $('.baseContent h3 .options');

            show = (typeof show !== 'undefined') ? show : true; //default variable

            if (hContainer[0]) {
                if (pUL[0]) {
                    if (show) {
                        pUL.addClass('hidden');
                    } else {
                        pUL.removeClass('hidden');
                    }
                }
                if (options[0]) {
                    if (show) {
                        options.removeClass('hidden');
                    } else {
                        options.addClass('hidden');
                    }
                }
                if (show) {
                    tThis.not('.options a').addClass('hidden');
                } else {
                    tThis.not('.options a').removeClass('hidden');
                }
                if (show) {
                    hContainer.removeClass('hidden');
                } else {
                    hContainer.addClass('hidden');

                }
            }
        }
        //first initialization
        reloadFunc();

        //add the login class to the body to style the login page
    }
});


/**
 * Global variables
 */
plugins = {
    pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
    //smoothScroll: $html.hasClass("use--smoothscroll") ? "js/smoothscroll.min.js" : false,
    bootstrapTooltip: $("[data-toggle='tooltip']"),
    bootstrapTabs: $(".tabs"),
    rdParallax: $(".rd-parallax"),
    rdAudioPlayer: $(".rd-audio"),
    rdVideoPlayer: $(".rd-video-player"),
    responsiveTabs: $(".responsive-tabs"),
    rdGoogleMaps: $(".rd-google-map"),
    rdNavbar: $(".rd-navbar"),
    rdVideoBG: $(".rd-video"),
    rdRange: $('.rd-range'),
    textRotator: $(".text-rotator"),
    owl: $(".owl-carousel"),
    swiper: $(".swiper-slider"),
    counter: $(".counter"),
    flickrfeed: $(".flickr"),
    twitterfeed: $(".twitter"),
    progressBar: $(".progress-bar"),
    isotope: $(".isotope"),
    countDown: $(".countdown"),
    calendar: $(".rd-calendar"),
    facebookfeed: $(".facebook"),
    instafeed: $(".instafeed"),
    facebookWidget: $('#fb-root'),
    materialTabs: $('.rd-material-tabs'),
    filePicker: $('.rd-file-picker'),
    fileDrop: $('.rd-file-drop'),
    popover: $('[data-toggle="popover"]'),
    dateCountdown: $('.DateCountdown'),
    statefulButton: $('.btn-stateful'),
    slick: $('.slick-slider'),
    scroller: $(".scroll-wrap"),
    socialite: $(".socialite"),
    viewAnimate: $('.view-animate'),
    selectFilter: $("select"),
    rdInputLabel: $(".form-label"),
    stacktable: $("[data-responsive=true]"),
    bootstrapDateTimePicker: $("[data-time-picker]"),
    customWaypoints: $('[data-custom-scroll-to]'),
    photoSwipeGallery: $("[data-photo-swipe-item]"),
    circleProgress: $(".progress-bar-circle"),
    stepper: $("input[type='number']"),
    radio: $("input[type='radio']"),
    checkbox: $("input[type='checkbox']"),
    customToggle: $("[data-custom-toggle]"),
    rdMailForm: $(".rd-mailform"),
    regula: $("[data-constraints]"),
    search: $(".rd-search"),
    searchResults: $('.rd-search-results'),
    imgZoom: $('[mag-thumb]')
};


/**
 * RD Input Label
 * @description Enables RD Input Label Plugin
 */
if (plugins.rdInputLabel.length) {
    plugins.rdInputLabel.RDInputLabel();
}

/**
 * Regula
 * @description Enables Regula plugin
 */
if (plugins.regula.length) {
    attachFormValidator(plugins.regula);
}


/**
 * RD Mailform
 */

if (plugins.rdMailForm.length) {
    var i, j, k,
        msg = {
            'MF000': 'Successfully sent!',
            'MF001': 'Recipients are not set!',
            'MF002': 'Form will not work locally!',
            'MF003': 'Please, define email field in your form!',
            'MF004': 'Please, define type of your form!',
            'MF254': 'Something went wrong with PHPMailer!',
            'MF255': 'Aw, snap! Something went wrong.'
        };
    for (i = 0; i < plugins.rdMailForm.length; i++) {
        var $form = $(plugins.rdMailForm[i]);

        $form.attr('novalidate', 'novalidate').ajaxForm({
            data: {
                "form-type": $form.attr("data-form-type") || "contact",
                "counter": i
            },
            beforeSubmit: function () {
                var form = $(plugins.rdMailForm[this.extraData.counter]);
                var inputs = form.find("[data-constraints]");
                if (isValidated(inputs)) {
                    var output = $("#" + form.attr("data-form-output"));

                    if (output.hasClass("snackbars")) {
                        output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
                        output.addClass("active");
                    }
                } else {
                    return false;
                }
            },
            error: function (result) {
                var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output"));
                output.text(msg[result]);
            },
            success: function (result) {
                var form = $(plugins.rdMailForm[this.extraData.counter]);
                var output = $("#" + form.attr("data-form-output"));
                form.addClass('success');
                result = result.length == 5 ? result : 'MF255';
                output.text(msg[result]);
                if (result === "MF000") {
                    if (output.hasClass("snackbars")) {
                        output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
                    } else {
                        output.addClass("success");
                        output.addClass("active");
                    }
                } else {
                    if (output.hasClass("snackbars")) {
                        output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
                    } else {
                        output.addClass("error");
                        output.addClass("active");
                    }
                }
                form.clearForm();
                form.find('input, textarea').blur();

                setTimeout(function () {
                    output.removeClass("active");
                    form.removeClass('success');
                }, 5000);
            }
        });
    }
}

/**
 * attachFormValidator
 * @description  attach form validation to elements
 */
function attachFormValidator(elements) {
    for (var i = 0; i < elements.length; i++) {
        var o = $(elements[i]), v;
        o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
        v = o.parent().find(".form-validation");
        if (v.is(":last-child")) {
            o.addClass("form-control-last-child");
        }
    }

    elements
        .on('input change propertychange blur', function (e) {
            var $this = $(this), results;

            if (e.type != "blur") {
                if (!$this.parent().hasClass("has-error")) {
                    return;
                }
            }

            if ($this.parents('.rd-mailform').hasClass('success')) {
                return;
            }

            if ((results = $this.regula('validate')).length) {
                for (i = 0; i < results.length; i++) {
                    $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
                }
            } else {
                $this.siblings(".form-validation").text("").parent().removeClass("has-error")
            }
        })
        .regula('bind');
}

/**
 * isValidated
 * @description  check if all elemnts pass validation
 */
function isValidated(elements) {
    var results, errors = 0;
    if (elements.length) {
        for (j = 0; j < elements.length; j++) {

            var $input = $(elements[j]);

            if ((results = $input.regula('validate')).length) {
                for (k = 0; k < results.length; k++) {
                    errors++;
                    $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                }
            } else {
                $input.siblings(".form-validation").text("").parent().removeClass("has-error")
            }
        }

        return errors == 0;
    }
    return true;
}

/**
 * RD Range
 * @description Enables RD Range plugin
 */
if (plugins.rdRange.length) {
    plugins.rdRange.RDRange({});
}



/**
 * Bootstrap Date time picker
 */
if (plugins.bootstrapDateTimePicker.length) {
    var i;
    for (i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
        var $dateTimePicker = $(plugins.bootstrapDateTimePicker[i]);
        var options = {};

        options['format'] = 'dddd DD MMMM YYYY - HH:mm';
        if ($dateTimePicker.attr("data-time-picker") == "date") {
            options['format'] = 'DD.MM.YYYY';
            options['minDate'] = new Date();
        } else if ($dateTimePicker.attr("data-time-picker") == "time") {
            options['format'] = 'HH:mm';
        }

        options["time"] = ($dateTimePicker.attr("data-time-picker") != "date");
        options["date"] = ($dateTimePicker.attr("data-time-picker") != "time");
        options["shortTime"] = true;

        $dateTimePicker.bootstrapMaterialDatePicker(options);
    }
}


/**
 * Select2
 * @description Enables select2 plugin
 */
if (plugins.selectFilter.length) {
    var i;
    for (i = 0; i < plugins.selectFilter.length; i++) {
        var select = $(plugins.selectFilter[i]);

        select.select2({
            theme: "bootstrap"
        }).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
    }
}

/**
 * Stepper
 * @description Enables Stepper Plugin
 */
if (plugins.stepper.length) {
    plugins.stepper.stepper({
        labels: {
            up: "",
            down: ""
        }
    });
}

/**
 * Radio
 * @description Add custom styling options for input[type="radio"]
 */
if (plugins.radio.length) {
    var i;
    for (i = 0; i < plugins.radio.length; i++) {
        var $this = $(plugins.radio[i]);
        $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
    }
}

/**
 * Checkbox
 * @description Add custom styling options for input[type="checkbox"]
 */
if (plugins.checkbox.length) {
    var i;
    for (i = 0; i < plugins.checkbox.length; i++) {
        var $this = $(plugins.checkbox[i]);
        $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
    }
}


function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/* cookie.JS
 ========================================================*/
include('js/jquery.cookie.js');

/* Easing library
 ========================================================*/
include('js/jquery.easing.1.3.js');


/* Stick up menus
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/tmstickup.js');

        $(document).ready(function () {
            $('#stuck_container').TMStickUp({})
        });
    }
})(jQuery);

/* ToTop
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.ui.totop.js');

        $(document).ready(function () {
            $().UItoTop({easingType: 'easeOutQuart'});
        });
    }
})(jQuery);

/* EqualHeights
 ========================================================*/
;
(function ($) {
    var o = $('[data-equal-group]');
    if (o.length > 0) {
        include('js/jquery.equalheights.js');
    }
})(jQuery);

/* SMOOTH SCROLLIG
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.mousewheel.min.js');
        include('js/jquery.simplr.smoothscroll.min.js');

        $(document).ready(function () {
            $.srSmoothscroll({
                step: 150,
                speed: 800
            });
        });
    }
})(jQuery);

/* Copyright Year
 ========================================================*/
;
(function ($) {
    var currentYear = (new Date).getFullYear();
    $(document).ready(function () {
        $("#copyright-year").text((new Date).getFullYear());
    });
})(jQuery);


;
(function ($) {
    function include(url) {
        document.write('<script src="js/' + url + '"></script>');
        return false;
    }

    include('superfish.js');
    jQuery(function () {
    });
})(jQuery);

/* Navbar
 ========================================================*/
;
(function ($) {
    include('js/jquery.rd-navbar.js');
})(jQuery);


/* Google Map
 ========================================================*/
;
(function ($) {
    var o = document.getElementById("google-map");
    if (o) {
        include('//maps.google.com/maps/api/js?sensor=false');
        include('js/jquery.rd-google-map.js');

        $(document).ready(function () {
            var o = $('#google-map');
            if (o.length > 0) {
                o.googleMap({styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]});
            }
        });
    }
})
(jQuery);

/* WOW
 ========================================================*/
;
(function ($) {
    var o = $('html');

    if ((navigator.userAgent.toLowerCase().indexOf('msie') == -1 ) || (isIE() && isIE() > 9)) {
        if (o.hasClass('desktop')) {
            include('js/wow.js');

            $(document).ready(function () {
                new WOW().init();
            });
        }
    }
})(jQuery);



/* Orientation tablet fix
 ========================================================*/
$(function () {
    // IPad/IPhone
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,

        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },

        scaleFix = function () {
            if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false);
            }
        };

    scaleFix();
    // Menu Android
    if (window.orientation != undefined) {
        var regM = /ipod|ipad|iphone/gi,
            result = ua.match(regM);
        if (!result) {
            $('.sf-menus li').each(function () {
                if ($(">ul", this)[0]) {
                    $(">a", this).toggle(
                        function () {
                            return false;
                        },
                        function () {
                            window.location.href = $(this).attr("href");
                        }
                    );
                }
            })
        }
    }
});
var ua = navigator.userAgent.toLocaleLowerCase(),
    regV = /ipod|ipad|iphone/gi,
    result = ua.match(regV),
    userScale = "";
if (!result) {
    userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">');

/* Camera
 ========================================================*/
;
(function ($) {
    var o = $('#camera');
    if (o.length > 0) {
        if (!(isIE() && (isIE() > 9))) {
            include('js/jquery.mobile.customized.min.js');
        }

        include('js/camera.js');

        $(document).ready(function () {
            o.camera({
                autoAdvance: true,
                height: '25.87890625%',
                minHeight: '300px',
                pagination: false,
                thumbnails: false,
                playPause: false,
                hover: false,
                loader: 'none',
                navigation: true,
                navigationHover: false,
                mobileNavHover: false,
                fx: 'simpleFade'
            })
        });
    }
})(jQuery);

/* Search.js
 ========================================================*/
;
(function ($) {
    var o = $('.search-form');
    if (o.length > 0) {
        include('js/TMSearch.js');
    }
})(jQuery);


/* FancyBox

 ========================================================*/

;(function ($) {
    var o = $('.thumb');
    if (o.length > 0) {
        include('js/jquery.fancybox.js');
        include('js/jquery.fancybox-media.js');
        include('js/jquery.fancybox-buttons.js');
        $(document).ready(function () {
            o.fancybox();
        });
    }
})(jQuery);


/* Parallax
 =============================================*/
;
(function ($) {
    include('js/jquery.rd-parallax.js');
})(jQuery); 




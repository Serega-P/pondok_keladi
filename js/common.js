document.addEventListener('DOMContentLoaded', function() {


    MicroModal.init({
        openTrigger: 'data-custom-open', // [3]
        closeTrigger: 'data-custom-close', // [4]
        openClass: 'is-open', // [5]
        disableScroll: true, // [6]
        disableFocus: false, // [7]
        awaitOpenAnimation: false, // [8]
        awaitCloseAnimation: false, // [9]
        debugMode: true // [10]
    });

    $('[data-custom-open]').click(function() {
        $('.modal [name=form]').val($(this).data('form'))
    })

    // menu

    const toggleMenu = () => {
        $('.top-line__menu-toggle').toggleClass('top-line__menu-opned')
        $('.top-line__menu-container').toggleClass('top-line__menu-active')
    }

    const closeMenu = () => {
        $('.top-line__menu-toggle').removeClass('top-line__menu-opned')
        $('.top-line__menu-container').removeClass('top-line__menu-active')
    }

    $(document).click((e) => {
        if ($(e.target).closest('.top-line__menu').length) return
        closeMenu()
    })

    $('.top-line__menu-toggle').click(() => { toggleMenu() });


    const homeSlider = new Swiper('.home-header__slider', {
        loop: false,
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: '.home-header__slider-arrow-next',
            prevEl: '.home-header__slider-arrow-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        pagination: {
            el: '.home-header__slider-pagination',
            type: 'fraction',
            formatFractionTotal: function(totalClass) {
                return '0' + totalClass;
            }
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
    });


    const galleryThumbs = new Swiper('.room-slider-gallery-thumbs', {
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 7,
            }
        }
    });

    const swiperRoom = new Swiper('.room-slider-gallery-top', {
        loop: false,
        navigation: {
            nextEl: '.room-slider-gallery__button-next',
            prevEl: '.room-slider-gallery__button-prev',
        },

        thumbs: {
            swiper: galleryThumbs
        },
    });

    const swiperRoomOptions = new Swiper('.room-slider-other-options', {
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
            el: ".other-options-navigation__bullets",
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.other-options-navigation__button-next',
            prevEl: '.other-options-navigation__button-prev',
        },

        breakpoints: {
            // when window width is >= 320px
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            }
        }
    });

    // rotate blocks

    const blockLoc = $('.home-header__location-block');
    const contentLoc = $('.home-header__location');

    const scrollbarContainer = $('.home-header__slider-scrollbar-container');
    const scrollbarHome = $('.swiper-scrollbar');


    const sizeBlockLocation = (sizes, block) => {
        block.style.width = sizes.width + 'px'
        block.style.height = sizes.height + 'px'
        return
    };

    if (blockLoc.length > 0) sizeBlockLocation(contentLoc[0].getBoundingClientRect(), blockLoc[0])


    lightGallery(document.getElementById("home-gallery"), {
        pager: false,
        plugins: [lgZoom],
        mobileSettings: {
            controls: false,
            showCloseIcon: false,
            download: false,
            rotate: false
        }
    });


    // reviews 

    const reviewsSlider = new Swiper('.swiper-reviews', {
        loop: false,
        pagination: {
            el: '.reviews-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.reviews-button-next',
            prevEl: '.reviews-button-prev',
        },

    });


    reviewsSlider.on('slideChange', function() {
        const ButtonsReviews = $('.readmore-js-toggle')

        const closeBlock = (buttons) => {
            buttons.each(function() {
                if ($(this).text() === 'Close') $(this).click()
            })
        }

        if (ButtonsReviews.length > 0) closeBlock(ButtonsReviews)
    });


    (function($) {

        var readmore = 'readmore',
            defaults = {
                speed: 100,
                maxHeight: 200,
                heightMargin: 16,
                moreLink: '<a href="#" class="link">Read More</a>',
                lessLink: '<a href="#" class="link">Close</a>',
                embedCSS: true,
                sectionCSS: 'display: block; width: 100%;',
                startOpen: false,
                expandedClass: 'readmore-js-expanded',
                collapsedClass: 'readmore-js-collapsed',

                // callbacks
                beforeToggle: function() {},
                afterToggle: function() {}
            },
            cssEmbedded = false;

        function Readmore(element, options) {
            this.element = element;

            this.options = $.extend({}, defaults, options);

            $(this.element).data('max-height', this.options.maxHeight);
            $(this.element).data('height-margin', this.options.heightMargin);

            delete(this.options.maxHeight);

            if (this.options.embedCSS && !cssEmbedded) {
                var styles = '.readmore-js-toggle, .readmore-js-section { ' + this.options.sectionCSS + ' } .readmore-js-section { overflow: hidden; }';

                (function(d, u) {
                    var css = d.createElement('style');
                    css.type = 'text/css';
                    if (css.styleSheet) {
                        css.styleSheet.cssText = u;
                    } else {
                        css.appendChild(d.createTextNode(u));
                    }
                    d.getElementsByTagName('head')[0].appendChild(css);
                }(document, styles));

                cssEmbedded = true;
            }

            this._defaults = defaults;
            this._name = readmore;

            this.init();
        }

        Readmore.prototype = {

            init: function() {
                var $this = this;

                $(this.element).each(function() {
                    var current = $(this),
                        maxHeight = (current.css('max-height').replace(/[^-\d\.]/g, '') > current.data('max-height')) ? current.css('max-height').replace(/[^-\d\.]/g, '') : current.data('max-height'),
                        heightMargin = current.data('height-margin');

                    if (current.css('max-height') != 'none') {
                        current.css('max-height', 'none');
                    }

                    $this.setBoxHeight(current);

                    if (current.outerHeight(true) <= maxHeight + heightMargin) {
                        // The block is shorter than the limit, so there's no need to truncate it.
                        return true;
                    } else {
                        current.addClass('readmore-js-section ' + $this.options.collapsedClass).data('collapsedHeight', maxHeight);

                        var useLink = $this.options.startOpen ? $this.options.lessLink : $this.options.moreLink;
                        current.after($(useLink).on('click', function(event) { $this.toggleSlider(this, current, event) }).addClass('readmore-js-toggle'));

                        if (!$this.options.startOpen) {
                            current.css({ height: maxHeight });
                        }
                    }
                });

                $(window).on('resize', function(event) {
                    $this.resizeBoxes();
                });
            },

            toggleSlider: function(trigger, element, event) {
                event.preventDefault();

                var $this = this,
                    newHeight = newLink = sectionClass = '',
                    expanded = false,
                    collapsedHeight = $(element).data('collapsedHeight');

                if ($(element).height() <= collapsedHeight) {
                    newHeight = $(element).data('expandedHeight') + 'px';
                    newLink = 'lessLink';
                    expanded = true;
                    sectionClass = $this.options.expandedClass;
                } else {
                    newHeight = collapsedHeight;
                    newLink = 'moreLink';
                    sectionClass = $this.options.collapsedClass;
                }

                // Fire beforeToggle callback
                $this.options.beforeToggle(trigger, element, expanded);

                $(element).animate({ 'height': newHeight }, {
                    duration: $this.options.speed,
                    complete: function() {
                        // Fire afterToggle callback
                        $this.options.afterToggle(trigger, element, expanded);

                        $(trigger).replaceWith($($this.options[newLink]).on('click', function(event) { $this.toggleSlider(this, element, event) }).addClass('readmore-js-toggle'));

                        $(this).removeClass($this.options.collapsedClass + ' ' + $this.options.expandedClass).addClass(sectionClass);
                    }
                });
            },

            setBoxHeight: function(element) {
                var el = element.clone().css({ 'height': 'auto', 'width': element.width(), 'overflow': 'hidden' }).insertAfter(element),
                    height = el.outerHeight(true);

                el.remove();

                element.data('expandedHeight', height);
            },

            resizeBoxes: function() {
                var $this = this;

                $('.readmore-js-section').each(function() {
                    var current = $(this);

                    $this.setBoxHeight(current);

                    if (current.height() > current.data('expandedHeight') || (current.hasClass($this.options.expandedClass) && current.height() < current.data('expandedHeight'))) {
                        current.css('height', current.data('expandedHeight'));
                    }
                });
            },

            destroy: function() {
                var $this = this;

                $(this.element).each(function() {
                    var current = $(this);

                    current.removeClass('readmore-js-section ' + $this.options.collapsedClass + ' ' + $this.options.expandedClass).css({ 'max-height': '', 'height': 'auto' }).next('.readmore-js-toggle').remove();

                    current.removeData();
                });
            }
        };

        $.fn[readmore] = function(options) {
            var args = arguments;
            if (options === undefined || typeof options === 'object') {
                return this.each(function() {
                    if ($.data(this, 'plugin_' + readmore)) {
                        var instance = $.data(this, 'plugin_' + readmore);
                        instance['destroy'].apply(instance);
                    }

                    $.data(this, 'plugin_' + readmore, new Readmore(this, options));
                });
            } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
                return this.each(function() {
                    var instance = $.data(this, 'plugin_' + readmore);
                    if (instance instanceof Readmore && typeof instance[options] === 'function') {
                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                });
            }
        }
    })(jQuery);


    $('.reviews-item__text-block').readmore({
        speed: 75,
        maxHeight: 100,
        embedCSS: false,
    });


    $("#photo-gallery")
        .justifiedGallery({
            captions: false,
            lastRow: "hide",
            rowHeight: 180,
            margins: 5
        })
        .on("jg.complete", function() {
            window.lightGallery(
                document.getElementById("photo-gallery"), {
                    autoplayFirstVideo: false,
                    pager: false,
                    galleryId: "nature",
                    plugins: [lgZoom, lgThumbnail],
                    mobileSettings: {
                        controls: false,
                        showCloseIcon: false,
                        download: false,
                        rotate: false
                    }
                }
            );
        });

})
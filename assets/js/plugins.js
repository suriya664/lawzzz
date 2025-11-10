/* ===========================================
   Plugins Initialization
   =========================================== */

(function($) {
    'use strict';

    $(document).ready(function() {
        
        // Initialize AOS (Animate On Scroll) if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Initialize Owl Carousel if available
        if (typeof $.fn.owlCarousel !== 'undefined') {
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                responsive: {
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: 3 }
                }
            });
        }

        // Initialize CounterUp if available
        if (typeof $.fn.counterUp !== 'undefined') {
            $('.counter').counterUp({
                delay: 10,
                time: 2000
            });
        }

        // Lightbox initialization (if plugin available)
        if (typeof $.fn.lightbox !== 'undefined') {
            $('[data-lightbox]').lightbox();
        }

        // Date Picker initialization (if plugin available)
        if (typeof $.fn.datepicker !== 'undefined') {
            $('.datepicker').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true
            });
        }

    });

})(jQuery);

/* ===========================================
   Main JavaScript File
   =========================================== */

(function($) {
    'use strict';

    // Wait for DOM to be ready
    $(document).ready(function() {
        
        // ===== Mobile Menu Toggle =====
        $('.mobile-toggle').on('click', function() {
            $('.nav-menu').toggleClass('active');
            $(this).toggleClass('active');
        });

        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.navbar').length) {
                $('.nav-menu').removeClass('active');
                $('.mobile-toggle').removeClass('active');
            }
        });

        // Close mobile menu when clicking a link
        $('.nav-menu a').on('click', function() {
            $('.nav-menu').removeClass('active');
            $('.mobile-toggle').removeClass('active');
        });

        // ===== Smooth Scroll for Anchor Links =====
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'swing');
            }
        });

        // ===== Active Navigation Link =====
        var currentPath = window.location.pathname.split('/').pop() || 'index.html';
        $('.nav-menu a').each(function() {
            var linkPath = $(this).attr('href');
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                $(this).addClass('active');
            }
        });

        // ===== Header Scroll Effect =====
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('.header').addClass('scrolled');
            } else {
                $('.header').removeClass('scrolled');
            }
        });

        // ===== Preloader =====
        $(window).on('load', function() {
            $('.preloader').addClass('hide');
            setTimeout(function() {
                $('.preloader').remove();
            }, 500);
        });

        // ===== Scroll to Top Button =====
        var scrollTopBtn = $('<button class="scroll-top" style="position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: var(--primary-color); color: white; border: none; border-radius: 50%; cursor: pointer; display: none; z-index: 999; box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: all 0.3s ease;"><i class="fa fa-arrow-up"></i></button>');
        $('body').append(scrollTopBtn);

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                $('.scroll-top').fadeIn();
            } else {
                $('.scroll-top').fadeOut();
            }
        });

        $('.scroll-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
        });

        // ===== Form Validation =====
        $('form').on('submit', function(e) {
            var isValid = true;
            $(this).find('input[required], textarea[required]').each(function() {
                if (!$(this).val().trim()) {
                    isValid = false;
                    $(this).addClass('error');
                    $(this).on('input', function() {
                        $(this).removeClass('error');
                    });
                }
            });

            // Email validation
            $(this).find('input[type="email"]').each(function() {
                var email = $(this).val();
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email && !emailRegex.test(email)) {
                    isValid = false;
                    $(this).addClass('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            }
        });

        // ===== Counter Animation =====
        function animateCounter() {
            $('.counter').each(function() {
                var $this = $(this);
                var countTo = $this.attr('data-count');
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }

        // Trigger counter on scroll
        $(window).on('scroll', function() {
            $('.counter').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    if (!$(this).hasClass('animated')) {
                        $(this).addClass('animated');
                        animateCounter.call(this);
                    }
                }
            });
        });

        // ===== Testimonials/Carousel Slider =====
        var currentSlide = 0;
        var slides = $('.testimonial-item');
        var totalSlides = slides.length;

        if (totalSlides > 1) {
            slides.hide();
            slides.eq(0).show();

            setInterval(function() {
                slides.eq(currentSlide).fadeOut(300);
                currentSlide = (currentSlide + 1) % totalSlides;
                slides.eq(currentSlide).fadeIn(300);
            }, 5000);
        }

        // ===== FAQ Accordion =====
        $('.faq-item .faq-question').on('click', function() {
            var $faqItem = $(this).parent('.faq-item');
            var $answer = $faqItem.find('.faq-answer');

            $faqItem.toggleClass('active');
            $answer.slideToggle(300);

            // Close other items
            $('.faq-item').not($faqItem).removeClass('active');
            $('.faq-item').not($faqItem).find('.faq-answer').slideUp(300);
        });

        // ===== Dark Mode Toggle =====
        var themeToggle = $('.theme-toggle');
        var currentTheme = localStorage.getItem('theme') || 'light';
        
        if (currentTheme === 'dark') {
            $('html').attr('data-theme', 'dark');
        }

        themeToggle.on('click', function() {
            var theme = $('html').attr('data-theme');
            if (theme === 'dark') {
                $('html').attr('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                $('html').attr('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });

        // ===== Image Lazy Loading =====
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            $('img.lazy').each(function() {
                imageObserver.observe(this);
            });
        }

        // ===== Animate on Scroll =====
        function animateOnScroll() {
            $('.animate-on-scroll').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animated');
                }
            });
        }

        $(window).on('scroll', animateOnScroll);
        animateOnScroll();

        // ===== Modal Close =====
        $('.modal-close, .modal-overlay').on('click', function() {
            $('.modal').fadeOut();
        });

        // ===== Initialize Tooltips (if Bootstrap is available) =====
        if (typeof bootstrap !== 'undefined') {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

    });

    // ===== Window Load Event =====
    $(window).on('load', function() {
        // Additional initialization on full page load
        $('body').addClass('loaded');
    });

})(jQuery);

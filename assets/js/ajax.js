/* ===========================================
   AJAX Utility Functions
   =========================================== */

(function($) {
    'use strict';

    // AJAX Form Submission
    window.submitForm = function(formElement, options) {
        var defaults = {
            url: formElement.action || window.location.href,
            method: formElement.method || 'POST',
            success: function(response) {
                alert('Form submitted successfully!');
            },
            error: function(xhr, status, error) {
                alert('An error occurred. Please try again.');
            },
            beforeSend: function() {
                return true;
            }
        };

        var settings = $.extend({}, defaults, options);

        $(formElement).on('submit', function(e) {
            e.preventDefault();

            if (!settings.beforeSend()) {
                return false;
            }

            var formData = new FormData(formElement);
            var submitBtn = $(formElement).find('button[type="submit"], input[type="submit"]');
            var originalText = submitBtn.val() || submitBtn.text();

            // Show loading state
            submitBtn.prop('disabled', true).val('Sending...').text('Sending...');

            $.ajax({
                url: settings.url,
                method: settings.method,
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    submitBtn.prop('disabled', false).val(originalText).text(originalText);
                    settings.success(response);
                    formElement.reset();
                },
                error: function(xhr, status, error) {
                    submitBtn.prop('disabled', false).val(originalText).text(originalText);
                    settings.error(xhr, status, error);
                }
            });

            return false;
        });
    };

    // Load Content via AJAX
    window.loadContent = function(url, targetElement, options) {
        var defaults = {
            method: 'GET',
            success: function(data) {
                $(targetElement).html(data);
            },
            error: function() {
                $(targetElement).html('<p>Error loading content. Please refresh the page.</p>');
            },
            loadingText: 'Loading...'
        };

        var settings = $.extend({}, defaults, options);

        $(targetElement).html('<div class="loading">' + settings.loadingText + '</div>');

        $.ajax({
            url: url,
            method: settings.method,
            success: function(data) {
                settings.success(data);
            },
            error: function(xhr, status, error) {
                settings.error(xhr, status, error);
            }
        });
    };

    // Contact Form Handler
    $(document).ready(function() {
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            var form = $(this);
            var formData = form.serialize();
            var submitBtn = form.find('button[type="submit"]');

            submitBtn.prop('disabled', true).text('Sending...');

            // Simulate AJAX call (replace with actual endpoint)
            setTimeout(function() {
                submitBtn.prop('disabled', false).text('Send Message');
                alert('Thank you for your message! We will get back to you soon.');
                form[0].reset();
            }, 1500);

            // Actual AJAX implementation:
            /*
            $.ajax({
                url: 'contact-handler.php',
                method: 'POST',
                data: formData,
                success: function(response) {
                    submitBtn.prop('disabled', false).text('Send Message');
                    alert('Thank you for your message! We will get back to you soon.');
                    form[0].reset();
                },
                error: function() {
                    submitBtn.prop('disabled', false).text('Send Message');
                    alert('An error occurred. Please try again.');
                }
            });
            */
        });
    });

})(jQuery);

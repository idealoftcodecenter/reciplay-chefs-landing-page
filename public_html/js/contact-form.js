jQuery('document').ready(function($) {
    'use strict';

    var $contact_form = $('#contact-form');
    var formInputs = {
        name: $contact_form.find('input[name="name"]'),
        contact_number: $contact_form.find('input[name="contact_number"]'),
        email: $contact_form.find('input[name="email"]'),
        captcha: $contact_form.find('input[name="captcha"]'),
        query: $contact_form.find('textarea[name="query"]')
    };

    function validateText(text, min, max) {
        min = min || 4;
        max = max || 64;
        var regex = /[0-9A-Za-z \s\-\+\?\,\.\!\;\_\(\)\%]+$/;
        if (!text || !text.trim()) {
			return false;
		} else {
			if (text.length < min) {
				return false;
			} else if (text.length > max) {
				return false;
			} else if(!regex.test(text)) {
				return false;
			}
		}
		return true;
    }
    
    function validateContact(contactNumber, min, max) {
        min = min || 8;
        max = max || 20;
        var regex = /[0-9 \s\+\-]+$/;
        if (!contactNumber || !contactNumber.trim()) {
			return false;
		} else {
            if (contactNumber.length < min) {
				return false;
			} else if (contactNumber.length > max) {
				return false;
			} else if(!regex.test(contactNumber)) {
				return false;
			}
        }
        return true;
    }
    function validateEmail(email, min, max) {
        min = min || 5;
        max = max || 20;
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || !email.trim()) {
			return false;
		} else {
            if (email.length < min) {
				return false;
			} else if (email.length > max) {
				return false;
			} else if(!regex.test(email)) {
				return false;
			}
        }
        return true;
    }


    function showError(inputName) {
        formInputs[inputName].removeClass('is-valid').addClass('is-invalid');
    }
    function showSuccess(inputName) {
        formInputs[inputName].removeClass('is-invalid').addClass('is-valid');
    }
    
    $contact_form.find('input, textarea').on('keyup', handleKeyup);
    function handleKeyup() {
        var $this = $(this);
        var input = $this.attr('name');
        console.log(input);
        if(input == 'name') {
            if(validateText($this.val(), 4, 30)) {
                showSuccess(input);
            } else {
                showError(input);
            }
        } else if(input == 'contact_number') {
            if(validateContact($this.val())) {
                showSuccess(input);
            } else {
                showError(input);
            }
        } else if(input == 'email') {
            if(validateEmail($this.val())) {
                showSuccess(input);
            } else {
                showError(input);
            }
        } else if(input == 'query') {
            if(validateText($this.val(), 4, 120)) {
                showSuccess(input);
            } else {
                showError(input);
            }
        }
    }

    // $.each(formInputs, function(input) {
    //     if(formInputs[input].val()) {
    //         handleKeyup.call(formInputs[input]);
    //     }
    // });

    // $contact_form.on('submit', handleFormSubmit);
    // function handleFormSubmit(evt) {
    //     evt.preventDefault();
    //     $.each(formInputs, function($input) {
    //         handleKeyup.call('');
    //     });
    // }
});
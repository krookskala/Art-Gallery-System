$(document).ready(function () {
    $("form.signup").on("submit", function (event) {
        event.preventDefault();
        console.log("Signup form submitted");
        
        const userData = {
            email: $("#email-input").val().trim(),
            password: $("#password-input").val().trim()
        };

        if (!userData.email || !userData.password) {
            displayMessage("Both email and password are required", "error");
            return;
        }

        signUpUser(userData.email, userData.password);
    });

    function signUpUser(email, password) {
        $.ajax({
            url: "/api/signup",
            method: "POST",
            data: {
                email: email,
                password: password
            },
            success: function(response) {
                displayMessage("Registration successful! Please login to continue.", "success");
                // Switch to login modal after 3 seconds
                setTimeout(() => {
                    UIkit.offcanvas("#offcanvas-reveal-signup").hide();
                    setTimeout(() => {
                        UIkit.offcanvas("#offcanvas-reveal-login").show();
                    }, 300);
                }, 3000);
            },
            error: function(err) {
                console.error("Signup error:", err);
                let errorMessage = "An error occurred during signup";
                if (err.responseJSON && err.responseJSON.message) {
                    errorMessage = err.responseJSON.message;
                }
                displayMessage(errorMessage, "error");
            }
        });
    }

    function displayMessage(message, type) {
        const messageBox = $("<div>")
            .addClass("uk-alert")
            .addClass(type === "error" ? "uk-alert-danger" : "uk-alert-success")
            .text(message);

        $(".uk-alert").remove();
        $("form.signup").prepend(messageBox);

        setTimeout(() => {
            messageBox.fadeOut(() => messageBox.remove());
        }, 3000);
    }
});

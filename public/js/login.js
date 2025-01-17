$(document).ready(function() {
    // Login form submit handler
    $("form.login").on("submit", function(event) {
        event.preventDefault();
        
        const userData = {
            email: $("#login-email-verify").val().trim(),
            password: $("#login-password-verify").val().trim()
        };

        if (!userData.email || !userData.password) {
            displayMessage("Both email and password are required", "error");
            return;
        }

        loginUser(userData.email, userData.password);
    });

    // Switch to signup modal
    $(document).on("click", ".switch-to-signup", function(event) {
        event.preventDefault();
        UIkit.offcanvas("#offcanvas-reveal-login").hide();
        setTimeout(() => {
            UIkit.offcanvas("#offcanvas-reveal-signup").show();
        }, 300);
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
        .then(function(response) {
            // Redirect based on role
            window.location.replace(response.redirectUrl);
        })
        .catch(function(err) {
            console.error("Login error:", err);
            displayMessage("Invalid login credentials", "error");
        });
    }

    function displayMessage(message, type) {
        const messageBox = $("<div>")
            .addClass("uk-alert")
            .addClass(type === "error" ? "uk-alert-danger" : "uk-alert-success")
            .text(message);

        $(".uk-alert").remove();
        $("form.login").prepend(messageBox);

        setTimeout(() => {
            messageBox.fadeOut(() => messageBox.remove());
        }, 3000);
    }
});

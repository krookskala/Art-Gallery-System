$(document).ready(function() {
    // Logout Process
    $("#logout-btn").on("click", function() {
        $.post("/api/logout")
            .then((response) => {
                if (response.success) {
                    UIkit.notification({
                        message: response.message,
                        status: 'success'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
            .fail(err => {
                console.error("Logout error:", err);
                UIkit.notification({
                    message: err.responseJSON?.message || 'Logout failed',
                    status: 'danger'
                });
            });
    });

    // Email Update
    $("#change-email-btn").on("click", function() {
        const newEmail = $("#new-email").val().trim();
        
        if (!newEmail) {
            UIkit.notification({
                message: 'Please enter your new email address',
                status: 'warning'
            });
            return;
        }

        $.ajax({
            url: "/api/user/email",
            method: "PUT",
            data: { email: newEmail }
        })
        .then((response) => {
            UIkit.notification({
                message: response.message,
                status: 'success'
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
        .fail(err => {
            UIkit.notification({
                message: err.responseJSON?.message || 'Email update failed',
                status: 'danger'
            });
        });
    });

    // Password Update
    $("#change-password-btn").on("click", function() {
        const currentPassword = $("#current-password").val().trim();
        const newPassword = $("#new-password").val().trim();
        
        if (!currentPassword || !newPassword) {
            UIkit.notification({
                message: 'Please fill in all password fields',
                status: 'warning'
            });
            return;
        }

        $.ajax({
            url: "/api/user/password",
            method: "PUT",
            data: { 
                currentPassword: currentPassword,
                newPassword: newPassword
            }
        })
        .then((response) => {
            UIkit.notification({
                message: response.message,
                status: 'success'
            });
            $("#password-section").hide();
            $("#current-password, #new-password").val('');
        })
        .fail(err => {
            UIkit.notification({
                message: err.responseJSON?.message || 'Password update failed',
                status: 'danger'
            });
        });
    });
});
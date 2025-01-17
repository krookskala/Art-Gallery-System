$(function () {
    // Reusable POST Function
    function postData(url, data, successMessage) {
        $.post(url, data)
            .then(function () {
                alert(successMessage);
                location.reload();
            })
            .fail(function (err) {
                console.error(err);
                alert("An Error Occurred. Please Try Again.");
            });
    }

    // Add A New Artist
    $(document).off("click", ".artist-submit").on("click", ".artist-submit", function (event) {
        event.preventDefault();
        const newArtist = {
            artist_name: $(".artist-input").val().trim(),
            artist_phone: $(".phone-input").val().trim(),
            artist_email: $(".email-input").val().trim(),
            artist_bio: $(".bio-input").val().trim(),
        };

        if (!newArtist.artist_name || !newArtist.artist_email) {
            alert("Artist Name and Email are required.");
            return;
        }

        $.post("/api/artist", newArtist)
            .then(function () {
                alert(`${newArtist.artist_name} was added successfully!`);
                $(".artist-input, .phone-input, .email-input, .bio-input").val("");
            })
            .fail(function (err) {
                console.error("Error adding artist:", err);
                alert("Failed to add artist. Please try again.");
            });
    });

    // Add A New Style
    $(document).off("click", ".style-submit").on("click", ".style-submit", function (event) {
        event.preventDefault();
        const newStyle = {
            style_name: $(".stylename-input").val().trim(),
        };

        if (!newStyle.style_name) {
            alert("Style Name is required.");
            return;
        }

        console.log("Submitting style:", newStyle);

        $.post("/api/style", newStyle)
            .then(function () {
                alert(`${newStyle.style_name} was added successfully!`);
                $(".stylename-input").val("");
            })
            .fail(function (err) {
                console.error("Error adding style:", err);
                alert("Failed to add style. Please try again.");
            });
    });

    // Add Artwork Manually
    $(document).ready(function () {
        $(".artwork-submit").off("click").on("click", function (event) {
            event.preventDefault();

            const newArtwork = {
                artwork_name: $(".artwork-name-input").val().trim(),
                style_name: $(".style-name-input").val().trim(),
                artist_name: $(".artist-name-input").val().trim(),
                artwork_size: $(".artwork-size-input").val().trim(),
                artwork_descript: $(".artwork-description-input").val().trim(),
                artwork_medium: $(".artwork-medium-input").val().trim(),
                artwork_colortone: $(".artwork-color-input").val().trim(),
                artwork_price: $(".artwork-price-input").val().trim(),
                artwork_image: $(".artwork-image-input").val().trim(),
            };

            if (!newArtwork.artwork_name || !newArtwork.artwork_size || !newArtwork.artist_name) {
                alert("Artwork Name, Size, and Artist are required.");
                return;
            }

            $.post("/api/artwork", newArtwork)
                .then(() => {
                    alert(`${newArtwork.artwork_name} was added successfully!`);
                    location.reload();
                })
                .fail((err) => {
                    console.error("Error creating artwork:", err);
                    alert("Failed to create artwork. Please try again.");
                });
        });
    });

    // Add A New Exhibit
    $(".event-submit").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const newExhibit = {
            exhibit_name: $(".eventname-input").val().trim(),
            date: $(".eventdate-input").val().trim(),
            time: $(".eventtime-input").val().trim(),
            exhibit_descript: $(".eventdescription-input").val().trim(),
            exhibit_address: $(".eventaddress-input").val().trim(),
        };

        const requiredFields = [
            { value: newExhibit.exhibit_name, message: "Event Name is required." },
            { value: newExhibit.date, message: "Event Date is required." },
            { value: newExhibit.time, message: "Event Time is required." },
        ];

        for (const field of requiredFields) {
            if (!field.value) {
                alert(field.message);
                return;
            }
        }

        $.post("/api/exhibit", newExhibit)
            .then(function () {
                alert(`${newExhibit.exhibit_name} was added successfully!`);
                location.reload();
            })
            .fail(function (err) {
                console.error("Error adding exhibit:", err);
                alert("Failed to add exhibit. Please try again.");
            });
    });

    // Favorites
    $(document).on("click", ".favorite-button", function() {
        const styleName = $(this).data("style");
        const buttonText = $(this).find('.favorite-text');
        
        $.post("/api/favorites", { style_name: styleName })
            .done((response) => {
                UIkit.notification({
                    message: response.message,
                    status: 'success'
                });
                
                buttonText.text(response.isFavorite ? 'Remove from Favorites' : 'Add to Favorites');
                
                $(this).toggleClass('uk-button-danger uk-button-primary');
            })
            .fail((err) => {
                UIkit.notification({
                    message: err.responseJSON?.message || "An error occurred",
                    status: 'danger'
                });
            });
    });

    // Load favorites for User Dashboard
    function loadFavorites() {
        $.get("/api/favorites")
            .done((favorites) => {
                const favoritesList = $("#favorites-list");
                favoritesList.empty();
                
                favorites.forEach(fav => {
                    favoritesList.append(`
                        <div class="uk-card uk-card-default uk-margin">
                            <div class="uk-card-body">
                                <h3>${fav.Style.style_name}</h3>
                                <p>${fav.Style.style_description}</p>
                            </div>
                        </div>
                    `);
                });
            })
            .fail((err) => {
                UIkit.notification({
                    message: "Error loading favorites",
                    status: 'danger'
                });
            });
    }

    if ($("#favorites-list").length) {
        loadFavorites();
    }

    // Activity Feed
    $(document).ready(() => {
        $.get("/api/activity")
            .then((activities) => {
                const feed = $("#activity-feed");
                activities.forEach((act) => {
                    feed.append(`<li>${act.action} - ${act.details} at ${act.timestamp}</li>`);
                });
            })
            .fail((err) => {
                console.error(err);
            });
    });

    // Load bookmarks
    function loadBookmarks() {
        if ($("#bookmarks-list").length) {
            $.get("/api/bookmarks")
                .done((bookmarks) => {
                    const bookmarksList = $("#bookmarks-list");
                    bookmarksList.empty();
                    
                    if (bookmarks.length === 0) {
                        bookmarksList.append('<li>No saved exhibitions yet.</li>');
                        return;
                    }

                    bookmarks.forEach(bookmark => {
                        bookmarksList.append(`
                            <li>
                                <div class="uk-flex uk-flex-between uk-flex-middle">
                                    <div>
                                        <h4 class="uk-margin-small">${bookmark.Exhibit.exhibit_name}</h4>
                                        <p class="uk-text-meta uk-margin-remove">${bookmark.Exhibit.date} - ${bookmark.Exhibit.time}</p>
                                        <p class="uk-margin-small">${bookmark.Exhibit.exhibit_descript}</p>
                                    </div>
                                    <button 
                                        class="uk-button uk-button-danger uk-button-small remove-bookmark" 
                                        data-id="${bookmark.id}">
                                        <span uk-icon="trash"></span>
                                    </button>
                                </div>
                            </li>
                        `);
                    });
                })
                .fail((err) => {
                    UIkit.notification({
                        message: "Error loading saved exhibitions",
                        status: 'danger',
                        pos: 'top-right',
                        timeout: 3000
                    });
                });
        }
    }

    $(document).ready(() => {
        if ($("#bookmarks-list").length) {
            loadBookmarks();
        }
    });

    // Check favorite status on page load
    function checkFavoriteStatus() {
        const favoriteButton = $(".favorite-button");
        if (favoriteButton.length) {
            const styleName = favoriteButton.data("style");
            
            $.get(`/api/favorites/check/${styleName}`)
                .done((response) => {
                    if (response.isFavorite) {
                        favoriteButton.find('.favorite-text').text('Remove from Favorites');
                        favoriteButton.removeClass('uk-button-primary').addClass('uk-button-danger');
                    }
                })
                .fail((err) => console.error("Could not check favorite status:", err));
        }
    }

    $(document).ready(function() {
        checkFavoriteStatus();
    });

    // Bookmark functionality
    $(document).on("click", ".bookmark-button", function() {
        const button = $(this);
        const exhibitionId = button.data("id");
        const exhibitionName = button.data("name");
        const isBookmarked = button.data("bookmarked");
        
        if (isBookmarked) {
            // Remove bookmark
            $.ajax({
                url: `/api/bookmarks/${exhibitionId}`,
                method: 'DELETE'
            })
            .done(() => {
                button.data("bookmarked", false);
                button.removeClass('uk-button-danger').addClass('uk-button-primary');
                button.find('.bookmark-text').text('Save');
                
                UIkit.notification({
                    message: `${exhibitionName} removed from saved items`,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 3000
                });
            })
            .fail((err) => {
                UIkit.notification({
                    message: err.responseJSON?.message || 'An error occurred',
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 3000
                });
            });
        } else {
            // Add new bookmark
            $.post("/api/bookmarks", { exhibition_id: exhibitionId })
                .done(() => {
                    button.data("bookmarked", true);
                    button.removeClass('uk-button-primary').addClass('uk-button-danger');
                    button.find('.bookmark-text').text('Saved');
                    
                    UIkit.notification({
                        message: `${exhibitionName} saved successfully!`,
                        status: 'success',
                        pos: 'top-right',
                        timeout: 3000
                    });
                })
                .fail((err) => {
                    UIkit.notification({
                        message: err.responseJSON?.message || 'An error occurred',
                        status: 'danger',
                        pos: 'top-right',
                        timeout: 3000
                    });
                });
        }
    });

    // Check bookmark status on page load
    function checkBookmarkStatus() {
        if ($(".bookmark-button").length) {
            $(".bookmark-button").each(function() {
                const button = $(this);
                const exhibitionId = button.data("id");
                
                $.get(`/api/bookmarks/check/${exhibitionId}`)
                    .done((response) => {
                        if (response.isBookmarked) {
                            button.data("bookmarked", true);
                            button.removeClass('uk-button-primary').addClass('uk-button-danger');
                            button.find('.bookmark-text').text('Saved');
                        }
                    })
                    .fail((err) => console.error("Could not check bookmark status:", err));
            });
        }
    }

    $(document).ready(() => {
        checkBookmarkStatus();
    });
});
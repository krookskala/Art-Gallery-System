function loadCollectionPage(pageNumber, styleId, size = 2) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber);
    url.searchParams.set('size', size);

    $.ajax({
        url: url.toString(),
        method: 'GET',
        success: function(response) {
            $('#artwork-container').html(response);
            window.history.pushState({}, '', url.toString());

            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        error: function(error) {
            UIkit.notification({
                message: 'Error loading page',
                status: 'danger'
            });
        }
    });
}
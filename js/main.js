jQuery(document).ready(function ($) {
    $("body").on('click', 'ul.side-nav li a', function () {
        if ($(window).width() <= 992) {
            $('.button-collapse').sideNav('hide');
        }
    });
    $(".button-collapse").sideNav();
});

function initParallax () {
    $('.parallax').parallax();
}

function targetLinks(htmlText) {
    var div,
        anchors;
    div = document.createElement('div');
    div.innerHTML = htmlText;
    anchors = div.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
        var tmp = document.createElement("div");
        tmp.appendChild(anchors[i].cloneNode(true));
        var newAnchor = tmp.innerHTML;
        // Make local links relative
        newAnchor = newAnchor.replace(themeSettings.siteURL, '');
        // Most links that need to be "fixed" will be attachments
        if (anchors[i].href.indexOf("/wp-content/uploads/") != -1) {
            // Replaces the link with a link that opens in new tab/window which works with angular routing
            newAnchor = newAnchor.replace('">', '" target="_blank">');
        }
        // Get the extension of the href accounting for both new and old microsoft office extensions
        var extension = anchors[i].href.substring(anchors[i].href.length - 4, anchors[i].href.length).replace('.', '');
        // Check if the extension of the anchor is a document
        if ("docxpdfxlsxpptx".indexOf(extension) != -1) {
            // Add text document icon to the anchor text
            newAnchor = newAnchor.replace(anchors[i].text, '<i class="fa fa-file-text"></i> ' + anchors[i].text);
        }
        div.innerHTML = div.innerHTML.replace(tmp.innerHTML, newAnchor);
    }
    return div.innerHTML;
}
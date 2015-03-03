/**
 * Bookmarklet for highlighting diffs in GMail (e.g., commit spam)
 *
 * Quick and dirty; will probably break as soon as GMail has an update.
 *
 * The code that loads jQuery is from the article linked below.
 *
 * @author Reha Sterbin <rsterbin@gmail.com>
 * @see http://coding.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/
 */
(function(){

    // the minimum version of jQuery we want
    var v = '1.3.2';

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement('script');
        script.src = '//ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js';
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                initGmailDiffBookmarklet();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        initGmailDiffBookmarklet();
    }

    function initGmailDiffBookmarklet() {
        (window.gmailDiffBookmarklet = function() {

            var $panel = jQuery.noConflict()('.a3s');
            if ($panel.length < 1) {
                return;
            }
            var old = $panel.html();
            var lines = $panel.html().split("<br>");
            var buffer = '';
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                if (line.match('^-')) {
                    buffer += '<span style="color: red; font-weight: bold;">' + line + '</span>';
                } else if (line.match('^\\+')) {
                    buffer += '<span style="color: green; font-weight: bold;">' + line + '</span>';
                } else {
                    buffer += line;
                }
                buffer += "\n";
            }
            $panel.html('<pre>' + buffer + '</pre>');
            $panel.css('font-size', '1.25em');

        })();
    }

})();


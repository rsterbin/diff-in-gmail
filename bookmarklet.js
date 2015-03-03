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
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js';
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

            // Found at http://stackoverflow.com/a/12034334
            var entityMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': '&quot;', "'": '&#39;', "/": '&#x2F;' };
            var escapeHtml = function (string) {
                return String(string).replace(/[&<>"'\/]/g, function (s) {
                    return entityMap[s];
                });
            }

            var $j = jQuery.noConflict();
            if ($j('.a3s').length < 1) {
                return;
            }
            var $panel = $j('.a3s').first();
            var old = $panel.html();
            var lines = $panel.text().split("\n");
            var buffer = '';
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].match('^-')) {
                    buffer += '<span style="color: red; font-weight: bold;">' + escapeHtml(lines[i]) + '</span>';
                } else if (lines[i].match('^\\+')) {
                    buffer += '<span style="color: green; font-weight: bold;">' + escapeHtml(lines[i]) + '</span>';
                } else {
                    buffer += escapeHtml(lines[i]);
                }
                buffer += "\n";
            }
            $panel.html('<pre>' + buffer + '</pre>');
            $panel.css('font-size', '1.25em');

        })();
    }

})();


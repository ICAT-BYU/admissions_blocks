var $CurrentAudience = ""; 

function changeAudience(audience) {
    url = document.location.href;
    if (url.indexOf("?") == -1) {
        url = url + "?" + audience;
    } else {
        url = url.replace("?" + $CurrentAudience, "?" + audience);
    }
    window.location.assign(url); 
}


jQuery(document).ready(function($) {

    $(window).load(function() {
        $CurrentAudience = Drupal.settings['admissions_blocks']['CurrentAudience'];

        $('a').each(function () {
            var $href = $(this).attr('href');
            if ((typeof $href !== 'undefined') && ($href !== false)) {
                if ($href.indexOf("http") == -1) {
                    if ($href.indexOf("?" + $CurrentAudience) != -1) {
                        $newHref = $href;
                    } else if ($href.indexOf("?") != -1) {
                        $newHref = $href.replace("?","?" + $CurrentAudience + "&");
                    } else {
                        $newHref = $href + "?" + $CurrentAudience;
                    }
                    $(this).attr('href', $newHref);
                }
            }
        });
    });

});   



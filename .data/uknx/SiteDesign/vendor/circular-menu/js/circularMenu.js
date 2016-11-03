/**
 * Created by ergin on 1.10.2016.
 */

(function ($, window, document) {

    var toggleCircularMenu = function () {
        document.getElementById('circularMenu').classList.toggle('active');
    };

    document.toggleCircularMenu = toggleCircularMenu;

})(jQuery, window, document);
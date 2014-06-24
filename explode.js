var randID = (function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

var explode = function (elem) {
    var id = randID();
    elem.wrap('<div class="' + id + '"></div>');
    elem.addClass('content');
    var $t = $('.' + id);

    var amount = 4;

    var width = $t.width() / amount;
    var height = $t.height() / amount;
    (genClips = function () {


        var totalSquares = Math.pow(amount, 2);

        var html = $t.find('.content').html();

        var y = 0;

        var i = 0;
        for (var z = 0; z <= (amount * width); z = z + width) {
            $('<div class="clipped' + id + '" count="' + i + '" style="clip: rect(' + y + 'px, ' + (z + width) + 'px, ' + (y + height) + 'px, ' + z + 'px)">' + html + '</div>').appendTo($t);
            i++;

            if (z === (amount * width) - width) {

                y = y + height;
                z = -width;

            }

            if (y === (amount * height)) {
                break;
            }

        }

    })();

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    elem.css({
        'visibility': 'hidden'
    });
    var posit = elem.position();

    $('.clipped' + id).each(function () {
        var count = parseInt($(this).attr("count"));
        var h = Math.floor(count / amount) * height;
        var w = count % amount;
        $(this).css({
            'position': 'absolute',
            // 'top': String(posit.top),
            // 'left': String(400)+'px',
            // 'left': String(posit.left + w*width)+'px',
            'left': '0',
            'right': '0',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'transition': 'transform 1.4s ease-in, background 0.3s ease-in'

        })

        var v = rand(120, 90),
            angle = rand(89, 80),
            theta = (angle * Math.PI) / 180,
            g = -9.8;

        var self = $(this);

        var t = 0,
            z, r, nx,
            totalt = 15;

        var ny = 0;

        var negate = [1, -1, 0],
            direction = negate[Math.floor(Math.random() * negate.length)];

        var randDeg = rand(-5, 10),
            randScale = rand(0.9, 1.1),
            randDeg2 = rand(30, 5);

        $(this).css({
            // 'transform': 'scale(' + randScale + ') skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)',
            'transform': 'skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)',
        });

        z = setInterval(function () {

            var ux = (Math.cos(theta) * v) * direction;

            var uy = (Math.sin(theta) * v) - ((-g) * t);

            nx = (ux * t);

            ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
            ny = ny * -1;

            t = t + 0.30;

            if (t > totalt || (ny + posit.top + h) > window.innerHeight) {
                elem.css({
                    'visibility': 'visible'
                })
                $t.css({
                    'visibility': 'hidden'
                });
                $(self).remove();


                clearInterval(z);
            }


            $(self).css({
                'top': (ny + posit.top + h) + 'px',
                'left': (nx) + 'px'
            });


        }, 30);

    });
    elem.removeClass('content');
    elem.unwrap();
};
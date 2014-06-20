var randID = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

var explode = function(elem) {
    var id = randID();
    elem.wrap('<div class="' + id + '"></div>');
    elem.addClass('content');
    var $t = $('.' + id);

    (genClips = function() {
        
        var amount = 5;
        
        var width = $t.width() / amount;
        var height = $t.height() / amount;
        
        var totalSquares = Math.pow(amount, 2);
        
        var html = $t.find('.content').html();
        
        var y = 0;
        
        for(var z = 0; z <= (amount*width); z = z+width) { 
        
            $('<div class="clipped" style="clip: rect('+y+'px, '+(z+width)+'px, '+(y+height)+'px, '+z+'px)">'+html+'</div>').appendTo($t);
            
            if(z === (amount*width)-width) {
            
                y = y + height;
                z = -width;
            
            }
            
            if(y === (amount*height)) {
                break;
            }
            
        }
        
    })();
    
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    elem.css({'visibility' : 'hidden'});   
    
            $('.' + id + ' div:not(.content)').each(function() {
                $(this).css({
                    'position': 'absolute',
                    'top': '300',
                    'left': '0',
                    'right': '0',
                    'margin-left': 'auto',
                    'margin-right': 'auto',
                    '-webkit-transition': '-webkit-transform 1.4s ease-in, background 0.3s ease-in',
                    'transition': 'transform 1.4s ease-in, background 0.3s ease-in'

                })
                
                var v = rand(120, 90),
                    angle = rand(89, 80), // The angle (the angle of projection) is a random number between 80 and 89 degrees.
                    theta = (angle * Math.PI) / 180, // Theta is the angle in radians
                    g = -9.8; // And gravity is -9.8. If you live on another planet feel free to change
                    
                var self = $(this);
                
                // time is initially zero, also set some random variables. It's higher than the total time for the projectile motion
                // because we want the squares to go off screen. 
                var t = 0,
                    z, r, nx, ny,
                    totalt =  15;
                
                // The direction can either be left (1), right (-1) or center (0). This is the horizontal direction.
                var negate = [1, -1, 0],
                    direction = negate[ Math.floor(Math.random() * negate.length) ];
                
                // Some random numbers for altering the shapes position
                var randDeg = rand(-5, 10), 
                    randScale = rand(0.9, 1.1),
                    randDeg2 = rand(30, 5);                

                // And apply those
                $(this).css({
                    'transform' : 'scale('+randScale+') skew('+randDeg+'deg) rotateZ('+randDeg2+'deg)', 
                });
                 
                // Set an interval
                z = setInterval(function() {    
                    
                    // Horizontal speed is constant (no wind resistance on the internet)
                    var ux = ( Math.cos(theta) * v ) * direction;
                    
                    // Vertical speed decreases as time increases before reaching 0 at its peak
                    var uy = ( Math.sin(theta) * v ) - ( (-g) * t);
                    
                    // The horizontal position
                    nx = (ux * t);
                            
                    // s = ut + 0.5at^2
                    ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
                    
                    // Apply the positions  
                    $(self).css({'bottom' : (ny)+'px', 'left' : (nx)+'px'});
                    
                    // Increase the time by 0.10
                    t = t + 0.30;
                    
                    // If the time is greater than the total time clear the interval
                    if(t > totalt) {
                        elem.css({'visibility' : 'visible'})
                        $t.css({'visibility': 'hidden'});
                        $(self).remove();
                    
                                
                        // Finally clear the interval
                        clearInterval(z);
                    
                    }
                    
                }, 30); // Run this interval every 10ms. Changing this will change the pace of the animation
        
            });
                        elem.unwrap();
};
$(document).ready(function() {
    // Counter animation function
    function startCounter() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Start counter when the section comes into view
    var waypoint = new Waypoint({
        element: document.querySelector('.counter-section'),
        handler: function(direction) {
            if (direction === 'down') {
                startCounter();
                this.destroy();
            }
        },
        offset: '75%'
    });
});
$('button').click(function(){
         alert("Button clicked")
     })
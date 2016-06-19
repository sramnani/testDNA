//Directive to get random images on page reload

app.directive('randomImage', function() {
    return {
        restrict: 'AE',
        link: function(scope, elm, attrs) {
            var images = ['headercat.jpg', 'lorem_cat.jpeg','catball.jpg','catdual.jpg','catroller.jpg','catsleep.jpg'];
            elm.css({'background-image': 'url(images/'+ images[Math.floor(Math.random() * images.length)] + ')'});
            elm.css({'background-size': '225px 240px'});
            elm.css({'background-repeat': 'no-repeat'});
        }
    };
});

angular.module('util.directives', []);

angular.module('util.directives').directive('autoFocus', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem) {
            return $timeout(function() {
                return elem[0].focus();
            });
        }
    };
});
angular.module('util.directives').directive('fadingCaption', function() {
    return {
        restrict: 'A',
        scope: {
            show: '='
        },
        link: function(scope, elem, attrs) {
            var durationArgs, velocityArgs;
            velocityArgs = {
                opacity: scope.show ? 1 : 0,
                translateX: 0,
                translateY: 0
            };
            durationArgs = {
                duration: 1000,
                delay: 0,
                queue: false,
                easing: 'easeOutQuad'
            };
            return $(elem).velocity(velocityArgs, durationArgs);
        }
    };
});

angular.module('util.directives').directive('materializeTabs', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            return $timeout(function() {
                return $(elem).tabs();
            });
        }
    };
});

angular.module('util.directives').directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            if (scope.$last === true) {
                return $timeout(function() {
                    return scope.$emit('FinishRenderEvent', {
                        id: $(elem).parent().attr('id')
                    });
                });
            }
        }
    };
});
angular.module('util.directives').directive('preLoader', function() {
    return {
        restrict: 'E',
        template: '<div class="preloader-container"> <div class="preloader-wrapper big active"> <div class="spinner-layer spinner-blue"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-red"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-yellow"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-green"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div></div>'
    };
});
angular.module('util.directives').directive('slider', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            return $timeout(function() {
                var thisSlider;
                thisSlider = $(elem).slider({
                    full_width: true,
                    interval: 60000000
                });
                return scope.$on('FinishRenderEvent', function(event) {
                    $(elem).find('.indicators').click(function() {
                        return scope.$emit('IndicatorClickEvent', {
                            index: $(elem).find('.active').index()
                        });
                    });
                    return event.stopPropagation();
                });
            });
        }
    };
});
angular.module('util.directives').directive('staggeredList', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            return scope.$on('FinishRenderEvent', function(event, data) {
                var listElems, time;
                if (data.id === attrs.id) {
                    time = 0;
                    listElems = $(elem).find('a, li');
                    listElems.velocity({
                        translateX: "-100px"
                    }, {
                        duration: 0
                    });
                    listElems.each(function() {
                        var durationArg, velocityArg;
                        velocityArg = {
                            opacity: "1",
                            translateX: "0"
                        };
                        durationArg = {
                            duration: 800,
                            delay: time,
                            easing: [60, 10]
                        };
                        $(this).velocity(velocityArg, durationArg);
                        return time += 120;
                    });
                    return event.stopPropagation();
                }
            });
        }
    };
});
angular.module('util.directives').directive('wavesAfterRender', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (scope.$last === true) {
                return window.Waves.displayEffect();
            }
        }
    };
});

$(function () {

    var Page = (function () {

        var $navArrows = $('#nav-arrows').hide(),
            $shadow = $('#shadow').hide(),
            slicebox = $('#sb-slider').slicebox({
                onReady: function () {
                    $navArrows.show();
                    $shadow.show();
                },
                orientation: 'r',
                cuboidsRandom: true,
                disperseFactor: 30
            }),

            init = function () {
                initEvents();
                initAutoplay(); // 👈 Agregado
            },

            initEvents = function () {
                // Flecha derecha (siguiente)
                $navArrows.children(':first').on('click', function () {
                    slicebox.next();
                    return false;
                });

                // Flecha izquierda (anterior)
                $navArrows.children(':last').on('click', function () {
                    slicebox.previous();
                    return false;
                });
            },

            // ✅ Nueva función: cambia imagen cada 10 segundos
            initAutoplay = function () {
                setInterval(function () {
                    slicebox.next();
                }, 4000); // 10000 ms = 10 segundos
            };

        return {
            init: init
        };

    })();

    Page.init();

});

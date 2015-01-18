
/** PARAMETRES **/
var sizeGrille = 20;
var grilleID = "grille";
var gameInterval = function () {};

grilleController.generate(sizeGrille);
grilleController.draw(grilleID);




/**
 ***********************
 **** EVENTS HANDLER ***
 ***********************
 */


// Lors du clique sur le bouton "Jouer"
$('#play').on('click', function () {
    $('#grille').addClass('active');
    var game = new gameController(grilleController, neightboorController, grilleTempoController)
                  .start();
    gameInterval = setInterval(function (){
        var game = new gameController(grilleController, neightboorController, grilleTempoController)
                  .start();
    }, 100);
});


// Lors du clique sur le bouton "Stop"
$('#stop').on('click', function () {
    $('#grille').removeClass('active');
    clearInterval(gameInterval);
});


// Lors du clique sur le bouton "Reinitialiser"
$('#reset').on('click', function () {
    $('#stop').trigger('click');

    for (i = 0; i < sizeGrille; i++) {
        for (j = 0; j < sizeGrille; j++) {
            grilleController.setRow(i, j, 0);
        }
    }
    grilleController.draw(grilleID);
});


// Selection manuelle des elements de la grille
$('#grille').on('click', '.row', function () {
    var lineCoord = ($(this).parent().attr('id')).replace('line-', '');
    var rowCoord = ($(this).attr('id')).replace('row-', '');

    if ($(this).attr('data-active') == true) {
        $(this).attr('data-active', false);
        grilleController.setRow(lineCoord, rowCoord, 0);
    } else {
        $(this).attr('data-active', true);
        grilleController.setRow(lineCoord, rowCoord, 1);
    }
});


// Personnages
$('#characters').on('click', 'img', function () {
    var img = $(this).attr('src');

    $('#grille .row[data-active=true]').each(function () {
        $(this).css({
            background: 'url("'+ img +'")'
        });
    });
});

/** PARAMETRES **/
var sizeGrille = 20;
var grilleID = "grille";
var gameInterval = function () {};
var grille = new grilleController();
var grilleTempo = new grilleTempoController();

grille.generate(sizeGrille);
grille.draw(grilleID);




/**
 ***********************
 **** EVENTS HANDLER ***
 ***********************
 */


// Lors du clique sur le bouton "Jouer"
$('#play').on('click', function () {
    $('#grille').addClass('active');

    // Lancement du jeu
    gameInterval = setInterval(function (){
        var game = new gameController(grille, grilleTempo)
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
            grille.setRow(i, j, 0);
        }
    }
    grille.draw(grilleID);
});


// Selection manuelle des elements de la grille
$('#grille').on('click', '.row', function () {
    var lineCoord = ($(this).parent().attr('id')).replace('line-', '');
    var rowCoord = ($(this).attr('id')).replace('row-', '');

    if ($(this).attr('data-active') == true) {
        $(this).attr('data-active', false);
        grille.setRow(lineCoord, rowCoord, 0);
    } else {
        $(this).attr('data-active', true);
        grille.setRow(lineCoord, rowCoord, 1);
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
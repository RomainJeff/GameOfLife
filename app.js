
/** PARAMETRES **/
var sizeGrille = 20;
var grilleID = "grille";
var grille = new grilleController();
var grilleTempo = new grilleTempoController();
var gameControlsHandler = new gameControls({
    grille: grille,
    grilleTempo: grilleTempo,
    id: grilleID
});

grille.generate(sizeGrille);
grille.draw(grilleID);




/**
 ***********************
 **** EVENTS HANDLER ***
 ***********************
 */


// Lors du clique sur le bouton "Jouer"
$('#play').on('click', function () {
    gameControlsHandler.play();
});

// Lors du clique sur le bouton "Stop"
$('#stop').on('click', function () {
    gameControlsHandler.stop();
});

// Lors du clique sur le bouton "Reinitialiser"
$('#reset').on('click', function () {
    gameControlsHandler.reset(this);
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
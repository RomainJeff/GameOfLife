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
var settingsControlsHandler = new settingsControls(grille);


/** GENERATION & DESSIN DE LA GRILLE **/
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

// Lors du clique sur le bouton "Aleatoire"
$('#alea').on('click', function () {
    gameControlsHandler.alea();
});


// Selection manuelle des elements de la grille
$('#grille').on('click', '.row', function () {
    settingsControlsHandler.cellsSelect(this);
});

// Selection du personnage
$('#characters').on('click', 'img', function () {
    settingsControlsHandler.characterSelect(this);
});
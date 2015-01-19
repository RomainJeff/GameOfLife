/**
 * Class de control du jeu
 * @param object options
 *
 */
var gameControls = function (options) {

    // Si grille n'est pas une instance de grilleController
    // On declenche une erreur
    if (!(options['grille'] instanceof grilleController)) {
        throw "Grille doit etre une instance de grilleController";
    }

    // Si grilleTempo n'est pas une instance de grilleTempoController
    // On declenche une erreur
    if (!(options['grilleTempo'] instanceof grilleTempoController)) {
        throw "GrilleTempo doit etre une instance de grilleTempoController"
    }

    this.grille = options['grille'];
    this.grilleTempo = options['grilleTempo'];
    this.id = options['id'];

    this.interval = function () {};
};


/**
 * Lance le jeu
 *
 */
gameControls.prototype.play = function () {
    $(this.id).addClass('active');

    // Stockage de l'interval de mise a jour du jeu
    this.interval = setInterval(function (){
        var game = new gameController(this.grille, this.grilleTempo)
                  .start();
    }, 100);
};


/**
 * Stop le jeu
 *
 */
gameControls.prototype.stop = function () {
    $(this.id).removeClass('active');
    clearInterval(this.interval);
};


/**
 * Reinitialise le jeu
 * @param object currentElement
 *
 */
gameControls.prototype.reset = function (currentElement) {
    $(currentElement).trigger('click');

    for (i = 0; i < this.grille.getSize(); i++) {
        for (j = 0; j < this.grille.getSize(); j++) {
            this.grille.setRow(i, j, 0);
        }
    }

    this.grille.draw(this.id);
}
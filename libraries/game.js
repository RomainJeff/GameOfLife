/**
 * Gere le coeur du jeu
 * @param grilleController
 * @param neighborController
 * @param grilleTempoController
 */
var gameController = function (grilleController, neightboorController, grilleTempoController) {
    this.grilleController = grilleController;
    this.neightboorController = neightboorController;
    this.grilleTempoController = grilleTempoController;
}

/**
 * Lance une partie
 */
gameController.prototype.start = function() {
    // On parcourt les lignes
    for (line = 0; line < sizeGrille; line++) {
        this.grilleTempoController.setRow(line, 0, 0);

        // On parcourt les colonnes
        for (row = 0; row < sizeGrille; row++) {
            // On recupere le nombre de voisins
            var neightboors = this.neightboorController.init(this.grilleController, line, row)
                                                  .getAlive();

            // Si cellule morte
            if (this.grilleController.get()[line][row] == 0) {
                // Si 3 voisins = naissance
                if (neightboors == 3) {
                    this.grilleTempoController.setRow(line, row, 1);
                } else {
                    this.grilleTempoController.setRow(line, row, 0);
                }
            } else {
                // Si 2 ou 3 voisins = vivante
                if (neightboors == 2 || neightboors == 3) {
                    this.grilleTempoController.setRow(line, row, 1);
                } else {
                    this.grilleTempoController.setRow(line, row, 0);
                }
            }

            // On reset pour la prochaine cellule
            this.neightboorController.reset();
        }
    }

    // Mise a jour de la grille
    for(var i=0; i < this.grilleController.get().length; ++i)
    {
        for(var j=0; j < this.grilleController.get().length; ++j)
        {
            this.grilleController.setRow(i, j, this.grilleTempoController.get()[i][j]);
            this.grilleTempoController.setRow(i, j, 0);
        }
    }

    this.grilleController.draw(grilleID);
};
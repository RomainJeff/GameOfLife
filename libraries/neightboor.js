var neightboorController = {
    grilleController: [],
    line: 0,
    row: 0,

    neightboors: 0,

    /**
     * Initialise le controller avec la cellule
     * @param grilleController grilleController
     * @param int line
     * @param int row
     *
     */
    init: function (grilleController, line, row) {
        this.grilleController = grilleController;
        this.line = line;
        this.row = row;

        return this;
    },

    /**
     * Retourne le nombre de cellules voisines vivantes
     * @return int
     *
     */
    getAlive: function () {
        if (
            !this.isValidIndex(this.line - 1) || !this.isValidIndex(this.row - 1) ||
            !this.isValidIndex(this.line + 1) || !this.isValidIndex(this.row + 1)
        ) {
            return this.neightboors;
        }

        if (this.grilleController.get()[this.line][this.row - 1] == true) this.neightboors++;
        if (this.grilleController.get()[this.line][this.row + 1] == true) this.neightboors++;

        if (this.grilleController.get()[this.line - 1][this.row - 1] == true) this.neightboors++;
        if (this.grilleController.get()[this.line + 1][this.row - 1] == true) this.neightboors++;

        if (this.grilleController.get()[this.line - 1][this.row + 1] == true) this.neightboors++;
        if (this.grilleController.get()[this.line + 1][this.row + 1] == true) this.neightboors++;

        if (this.grilleController.get()[this.line - 1][this.row] == true) this.neightboors++;
        if (this.grilleController.get()[this.line + 1][this.row] == true) this.neightboors++;

        return this.neightboors;
    },

    /**
     * Verifie la validite de l'index courant
     * @param int index
     * @return boolean
     *
     */
    isValidIndex: function (index) {
        return (
            (index >= 0) &&
            (index < this.grilleController.getSize())
        );
    },

    /**
     * Reset la classe
     *
     */
    reset: function () {
        this.grilleController = [],
        this.line = 0;
        this.row = 0;
        this.neightboors = 0;
    }

};
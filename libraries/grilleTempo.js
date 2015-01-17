var grilleTempoController = {
    grille: [],

    /**
     * Recupere la grille temporaire
     * @return array grille
     *
     */
    get: function () {
        return this.grille;
    },

    /**
     * Defini une cellule de la grille temporaire
     * @param int line
     * @param int row
     * @param boolean value
     *
     */
    setRow: function (line, row, value) {
        if (!this.grille[line]) this.grille[line] = [];

        this.grille[line][row] = value;
    }
};
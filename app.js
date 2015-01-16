

/**
 * Generation de tableau
 * @param int taille
 */
function generateTableGrille(taille, alea) {
    var table = [];

    for(i = 0; i < taille; i++) {
        table[i] = [];

        for (ib = 0; ib < taille; ib++) {
            if (alea == true) {
                if ((Math.random() * 10) > 8) {
                    table[i][ib] = 1;
                } else {
                    table[i][ib] = 0;
                }
            } else {
                table[i][ib] = 0;
            }
        }
    }

    return table;
}


/**
 * Dessin du tableau
 * @param int taille
 */
function initGrille(table) {
    var toDisplay = "";

    for(iLine = 0; iLine < table.length; iLine++) {
        toDisplay += '<div id="line-'+ iLine +'" class="line">';

        for(iRow = 0; iRow < table.length; iRow++) {
            var active = (!table[iLine][iRow]) ? "false" : "true";
            toDisplay += '<div class="row" id="row-'+ iRow +'" data-active="'+ active +'"></div>';
        }

        toDisplay += '<div class="clear"></div>';
        toDisplay += '</div>';
    }

    // Initialisation
    $('#grille').html(toDisplay);
}


/**
 * Definie une valeur de la grille
 * @param int line
 * @param int row
 * @param bool value
 */
function setGrille(line, row, value) {
    grille[line][row] = value;
}


/** 
 * Verifie la validiter d'un index
 * @param int index
 */
function validIndex(index) {
    return ((index >= 0) && (index < sizeGrille));
}


/**
 * Recupere le nombre de voisines vivantes
 * @param array table
 * @param int line
 * @param int row
 */
function getNeightboorsAlive(line, row) {
    var neightboors = 0;

    if (
        !validIndex(line - 1) || !validIndex(row - 1) ||
        !validIndex(line + 1) || !validIndex(row + 1)
    ) {
        return 0;
    }

    if (grille[line][row - 1] == true) neightboors++;
    if (grille[line][row + 1] == true) neightboors++;

    if (grille[line - 1][row - 1] == true) neightboors++;
    if (grille[line + 1][row - 1] == true) neightboors++;

    if (grille[line - 1][row + 1] == true) neightboors++;
    if (grille[line + 1][row + 1] == true) neightboors++;

    if (grille[line - 1][row] == true) neightboors++;
    if (grille[line + 1][row] == true) neightboors++;

    return neightboors;
}


/** 
 * Lance la partie
 *
 */
function play() {
    // On parcourt les lignes
    for (line = 0; line < sizeGrille; line++) {
        grilleTempo[line] = [];

        // On parcourt les colonnes
        for (row = 0; row < sizeGrille; row++) {
            // On recupere le nombre de voisins
            var neightboors = getNeightboorsAlive(line, row);

            // Si cellule morte
            if (grille[line][row] == 0) {
                // Si 3 voisins = naissance
                if (neightboors == 3) {
                    grilleTempo[line][row] = 1;
                } else {
                    grilleTempo[line][row] = 0;
                }
            } else {
                // Si 2 ou 3 voisins = vivante
                if (neightboors == 2 || neightboors == 3) {
                    grilleTempo[line][row] = 1;
                } else {
                    grilleTempo[line][row] = 0;
                }
            }
        }
    }

    // Mise a jour de la grille
    for(var i=0; i < grille.length; ++i)
    {
        for(var j=0; j < grille.length; ++j)
        {
            grille[i][j] = grilleTempo[i][j];
            grilleTempo[i][j] = 0;
        }
    }

    initGrille(grille);
}


/** PARAMETRES **/
var sizeGrille = 20;
var grille = generateTableGrille(sizeGrille);
var grilleTempo = [];
var gameInterval = function () {};
initGrille(grille);




/**
 ***********************
 **** EVENTS HANDLER ***
 ***********************
 */


// Lors du clique sur le bouton "Jouer"
$('#play').on('click', function () {
    $('#grille').addClass('active');
    play();
    gameInterval = setInterval(function (){ play(); }, 100);
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
            grille[i][j] = 0;
        }
    }
    initGrille(grille);
});


// Selection manuelle des elements de la grille
$('#grille').on('click', '.row', function () {
    var lineCoord = ($(this).parent().attr('id')).replace('line-', '');
    var rowCoord = ($(this).attr('id')).replace('row-', '');

    if ($(this).attr('data-active') == true) {
        $(this).attr('data-active', false);
        setGrille(lineCoord, rowCoord, 0);
    } else {
        $(this).attr('data-active', true);
        setGrille(lineCoord, rowCoord, 1);
    }
});
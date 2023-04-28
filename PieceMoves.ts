import { Pieces } from "./entities";

export const movePionBlanc = (row: number, col: number, positions: (Pieces | null)[][]) => {
  //resultat
  const possibleMoves = [{}];

  const pieceDevant1 = positions[row - 1][col - 1];
  const pieceDevant2 = positions[row - 1][col + 1];

  //Si il ya une piece devant le pion (a droite ou a gauche) et qu'elle est noir
  if (pieceDevant1 && pieceDevant1.name.indexOf('Noir') !== -1 || pieceDevant2 && pieceDevant2.name.indexOf('Noir') !== -1) {
    //Si il y a une piece a gauche et une piece a droite alors il peut y aller
    if (positions[row - 1][col - 1] !== null && positions[row - 1][col + 1] !== null) {
      possibleMoves.push({ row: row - 1, col: col - 1 }, { row: row - 1, col: col + 1 });
    }
    // Si il y a une piece a gauche alors il peut y aller
    else if (positions[row - 1][col - 1] !== null) {
      possibleMoves.push({ row: row - 1, col: col - 1 });
    }
    // Si il y a une piece a droite alors il peut y aller
    else if (positions[row - 1][col + 1] !== null) {
      possibleMoves.push({ row: row - 1, col: col + 1 });
    }
  }
  //Si il y a une piece devant, le pion ne peut pas avancer
  if (positions[row - 1][col] == null) {
    possibleMoves.push({ row: row - 1, col: col });
    if (row === 6) {
      possibleMoves.push({ row: row - 2, col: col });
    }
  }
  return possibleMoves;
}

export const movePionNoir = (row: number, col: number, positions: (Pieces | null)[][]) => {
  //resultat
  const possibleMoves = [{}];
  const pieceDevant1 = positions[row + 1][col - 1];
  const pieceDevant2 = positions[row + 1][col + 1];

  //Si il ya une piece devant le pion (a droite ou a gauche) et qu'elle est noir
  if (pieceDevant1 && pieceDevant1.name.indexOf('Blanc') !== -1 || pieceDevant2 && pieceDevant2.name.indexOf('Blanc') !== -1) {
    //Si il y a une piece a gauche et une piece a droite alors il peut y aller
    if (positions[row + 1][col - 1] !== null && positions[row + 1][col + 1] !== null) {
      possibleMoves.push({ row: row + 1, col: col - 1 }, { row: row + 1, col: col + 1 });
    }
    // Si il y a une piece a gauche alors il peut y aller
    else if (positions[row + 1][col - 1] !== null) {
      possibleMoves.push({ row: row + 1, col: col - 1 });
    }
    // Si il y a une piece a droite alors il peut y aller
    else if (positions[row + 1][col + 1] !== null) {
      possibleMoves.push({ row: row + 1, col: col + 1 });
    }
  }
  //Si il y a une piece devant, le pion ne peut pas avancer
  if (positions[row + 1][col] == null) {
    possibleMoves.push({ row: row + 1, col: col });
    if (row === 1) {
      possibleMoves.push({ row: row + 2, col: col });
    }

  }
  return possibleMoves;
}

export const moveTourBlanc = (row: number, col: number, positions: (Pieces | null)[][]) => {
  const possibleMoves = [{}];

  //Mouvement vers la Droite
  for (let i = col + 1; i < 8; i++) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers la Gauche
  for (let i = col - 1; i >= 0; i--) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers le haut
  for (let i = row - 1; i >= 0; i--) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  //Mouvement vers le bas
  for (let i = row + 1; i < 8; i++) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  // tour meme ligne roi
  for (let rowT = 0; rowT < 8; rowT++) {
    for (let colT = 0; colT < 8; colT++) {
      const piece = positions[rowT][colT];
      if (piece && piece.name.indexOf('RoiBlanc') !== -1) {
        let reineMovesJson = JSON.stringify(possibleMoves);
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let rM of reineMovesParsed) {
          // si le roi et la reine sont sur la meme ligne
          if (row === rowT) {
            // row = rowT = ligne roi | rM.row = possibleMove reine
            if (rowT === rM.row) {
              // si on est sur la meme ligne (row) on veux ajouter/enlever une colonne (col)
              possibleMoves.push({ row: rowT, col: colT + 1 }, { row: rowT, col: colT - 1 });
            }
          }
          // si on est sur la meme colonne
          if (col === colT) {
            if (colT === rM.col) {
              possibleMoves.push({ row: rowT + 1, col: colT }, { row: rowT - 1, col: colT });
            }
          }
        }
      }
    }
  }

  return possibleMoves;
}

export const moveTourNoir = (row: number, col: number, positions: (Pieces | null)[][]) => {
  const possibleMoves = [{}];

  //Mouvement vers la Droite
  for (let i = col + 1; i < 8; i++) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers la Gauche
  for (let i = col - 1; i >= 0; i--) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers le haut
  for (let i = row - 1; i >= 0; i--) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  //Mouvement vers le bas
  for (let i = row + 1; i < 8; i++) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  // roi et tour sur meme ligne alors tour + 1
  for (let rowT = 0; rowT < 8; rowT++) {
    for (let colT = 0; colT < 8; colT++) {
      const piece = positions[rowT][colT];
      if (piece && piece.name.indexOf('RoiBlanc') !== -1) {
        let reineMovesJson = JSON.stringify(possibleMoves);
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let rM of reineMovesParsed) {
          // si le roi et la reine sont sur la meme ligne
          if (row === rowT) {
            // row = rowT = ligne roi | rM.row = possibleMove reine
            if (rowT === rM.row) {
              // si on est sur la meme ligne (row) on veux ajouter/enlever une colonne (col)
              possibleMoves.push({ row: rowT, col: colT + 1 }, { row: rowT, col: colT - 1 });
            }
          }
          // si on est sur la meme colonne
          if (col === colT) {
            if (colT === rM.col) {
              possibleMoves.push({ row: rowT + 1, col: colT }, { row: rowT - 1, col: colT });
            }
          }
        }
      }
    }
  }

  return possibleMoves;
}

/**
 * Cette fonction calcule les mouvements possibles pour un cavalier à partir d'une position donnée sur un plateau d'échecs.
 *
 * @param row La rangée (ou ligne) de la position de départ du cavalier.
 * @param col La colonne de la position de départ du cavalier.
 * @param positions Un tableau à deux dimensions représentant le plateau d'échecs et les pièces sur le plateau.
 * @returns Un tableau d'objets contenant les coordonnées de chaque case où le cavalier peut se déplacer.
 */
export const moveCavalierblanc = (row: number, col: number, positions: (Pieces | null)[][]) => {

  // Initialise un tableau vide pour stocker les mouvements possibles.
  const possibleMoves = [{}];

  // Définit les directions possibles pour un cavalier : deux cases à droite ou à gauche, suivies d'une case vers le haut ou vers le bas, et vice versa.
  const directions = [-2, -1, 1, 2];

  // Parcourt chaque direction possible.
  for (const dx of directions) {
    for (const dy of directions) {
      // Vérifie que le cavalier se déplace bien de deux cases dans une direction et d'une case dans l'autre direction (pour éviter les mouvements en diagonale).
      if (Math.abs(dx) !== Math.abs(dy)) {
        // Calcule la nouvelle rangée et la nouvelle colonne pour le déplacement.
        const newRow = row + dx;
        const newCol = col + dy;

        // Vérifie que la nouvelle position se trouve bien à l'intérieur du plateau.
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          // Vérifie s'il y a une pièce sur la nouvelle position.
          const piece = positions[newRow][newCol];
          if (!piece || piece.name.indexOf('Noir') !== -1) {
            // Si la nouvelle position est vide ou occupée par une pièce ennemie, ajoute la nouvelle position aux mouvements possibles.
            possibleMoves.push({ row: newRow, col: newCol });
          }
        }
      }
    }
  }

  return possibleMoves;
}

export const moveCavalierNoir = (row: number, col: number, positions: (Pieces | null)[][]) => {

  const possibleMoves = [{}];
  const directions = [-2, -1, 1, 2];

  for (const dx of directions) {
    for (const dy of directions) {
      if (Math.abs(dx) !== Math.abs(dy)) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const piece = positions[newRow][newCol];
          if (!piece || piece.name.indexOf('Blanc') !== -1) {
            possibleMoves.push({ row: newRow, col: newCol });
          }
        }
      }
    }
  }

  return possibleMoves;
}

/**
 * Cette fonction calcule le smouvements possibles pour un Roi à partir d'une position donnée sur un plateau d'échecs.
 * 
 * @param row La rangée (ou ligne) de la position de départ du Roi.
 * @param col La colonne de la position de départ du Roi.
 * @param positions Un tableau à deux dimensions représentant le plateau d'échecs et les pièces sur le plateau.
 * @returns Un tableau d'objets contenant les coordonnées de chaque case où le Roi peut se déplacer.
 */
export const moveRoiNoir = (row: number, col: number, positions: (Pieces | null)[][], hasMoved: boolean) => {
  let possibleMoves = [];

  const pieceDroite1 = positions[row][col + 1];
  const pieceDroite2 = positions[row][col + 2];
  const pieceDroite3 = positions[row][col + 3];

  const pieceGauche1 = positions[row][col - 1];
  const pieceGauche2 = positions[row][col - 2];
  const pieceGauche3 = positions[row][col - 3];
  const pieceGauche4 = positions[row][col - 4];

  //Petit roque
  // Verifier possibleMove des autres pieces sur chaque cases ou va se déplacer le roi
  if (!hasMoved) {
    if (row === 0 && pieceDroite1 == null && pieceDroite2 == null && pieceDroite3?.name == 'TourNoir' && pieceGauche1?.name !== 'TourBlanc' && pieceGauche2?.name !== 'TourBlanc' && pieceGauche3?.name !== 'TourBlanc' && pieceGauche4?.name !== 'TourBlanc' && pieceGauche1?.name !== 'ReineBlanc' && pieceGauche2?.name !== 'ReineBlanc' && pieceGauche3?.name !== 'ReineBlanc' && pieceGauche4?.name !== 'ReineBlanc') {
      let rowP = 1;
      let echecPion = false;
      let echecPiece = false;
      for (let col = 4; col < 8; col++) {
        // on regarde si il y a un pion sur la 1ere ligne
        if (positions[rowP][col]?.name === 'PionBlanc') {
          echecPion = true;
        }
      }

      // le cavalier peut mettre en échec le roi entre la row 0 et 2 et entre les col 2 et 7
      for (let row = 1; row < 3; row++) {
        for (let col = 2; col < 8; col++) {
          if (positions[row][col]?.name === 'CavalierBlanc') {
            echecPiece = true;
          }
        }
      }

      // on doit vérifier toutes les lignes et toutes les colonnes (pour les fous)
      for (let row = 1; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (positions[row][col]?.name === 'FouBlanc') {
            //converti le resultat de la fonction en string JSON
            let fouMovesJson = JSON.stringify(moveFouBlanc(row, col, positions));
            //converti la string JSON en objet
            let fouMovesParsed = JSON.parse(fouMovesJson);
            // il faut parcourir 'fouMovesParsed'qui est un tableau d'objet
            for (let fM of fouMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (fM.row === 0 && (fM.col === 4 || fM.col === 5 || fM.col === 6)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      for (let row = 0; row < 8; row++) {
        for (let col = 4; col < 8; col++) {
          if (positions[row][col]?.name === 'TourBlanc') {
            let tourMovesJson = JSON.stringify(moveTourBlanc(row, col, positions));
            let tourMovesParsed = JSON.parse(tourMovesJson);
            for (let tM of tourMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (tM.row === 0 && (tM.col === 4 || tM.col === 5 || tM.col === 6)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      for (let row = 0; row < 8; row++) {
        for (let col = 4; col < 8; col++) {
          if (positions[row][col]?.name === 'ReineBlanc') {
            let reineMovesJson = JSON.stringify(moveReineBlanc(row, col, positions));
            let reineMovesParsed = JSON.parse(reineMovesJson);
            for (let tM of reineMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (tM.row === 0 && (tM.col === 4 || tM.col === 5 || tM.col === 6)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      // Si aucunes autres pieces ne peux mettre en échec le roi pendant son roque alors il peut le faire
      if (!echecPion && !echecPiece) {
        possibleMoves.push({ row: row, col: col + 2 });
      }
    }
    //Grand roque
    if (row === 0 && pieceGauche1 == null && pieceGauche2 == null && pieceGauche3 == null && pieceGauche4?.name == 'TourNoir' && pieceDroite1?.name !== 'TourBlanc' && pieceDroite2?.name !== 'TourBlanc' && pieceDroite3?.name !== 'TourBlanc' && pieceDroite1?.name !== 'ReineBlanc' && pieceDroite2?.name !== 'ReineBlanc' && pieceDroite3?.name !== 'ReineBlanc') {

      let rowP = 1;
      let echecPion = false;
      let echecPiece = false;
      for (let col = 1; col < 5; col++) {
        if (positions[rowP][col]?.name === 'PionBlanc') {
          echecPion = true;
        }
      }

      // le cavalier peut mettre en échec le roi entre la row 0 et 2 et entre les col 1 et 5
      for (let row = 1; row < 3; row++) {
        for (let col = 1; col < 6; col++) {
          if (positions[row][col]?.name === 'CavalierBlanc') {
            echecPiece = true;
          }
        }
      }

      // on doit vérifier toutes les lignes et toutes les colonnes (pour les fous)
      for (let row = 1; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (positions[row][col]?.name === 'FouBlanc') {
            //converti le resultat de la fonction en string JSON
            let fouMovesJson = JSON.stringify(moveFouBlanc(row, col, positions));
            //converti la string JSON en objet
            let fouMovesParsed = JSON.parse(fouMovesJson);
            // il faut parcourir 'fouMovesParsed'qui est un tableau d'objet
            for (let fM of fouMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (fM.row === 0 && (fM.col === 2 || fM.col === 3 || fM.col === 4)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      for (let row = 0; row < 8; row++) {
        for (let col = 2; col < 5; col++) {
          if (positions[row][col]?.name === 'TourBlanc') {
            let tourMovesJson = JSON.stringify(moveTourBlanc(row, col, positions));
            let tourMovesParsed = JSON.parse(tourMovesJson);
            for (let tM of tourMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (tM.row === 0 && (tM.col === 2 || tM.col === 3 || tM.col === 4)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      for (let row = 0; row < 8; row++) {
        for (let col = 4; col < 8; col++) {
          if (positions[row][col]?.name === 'ReineBlanc') {
            let reineMovesJson = JSON.stringify(moveReineBlanc(row, col, positions));
            let reineMovesParsed = JSON.parse(reineMovesJson);
            for (let tM of reineMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (tM.row === 0 && (tM.col === 2 || tM.col === 3 || tM.col === 4)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      if (!echecPion && !echecPiece) {
        possibleMoves.push({ row: row, col: col - 2 });
      }
    }
  }

  let echecPiece = false;
  // Vérifier les cases autour du roi
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Vérifier si la case est à l'intérieur du plateau
      if (row + i >= 0 && row + i < 8 && col + j >= 0 && col + j < 8) {
        const piece = positions[row + i][col + j];
        // Vérifier si la case est vide ou contient une pièce ennemie
        if (!piece || (piece && piece.name.indexOf('Blanc') !== -1)) {

          if (!echecPiece) {
            possibleMoves.push({ row: row + i, col: col + j });
          }
        }
      }
    }
  }

  // Condition d'échec avec reine blanc
  let possibleMovesJSON = JSON.stringify(possibleMoves);
  let possibleMovesParsed = JSON.parse(possibleMovesJSON);

  for (let rowF = 0; rowF < 8; rowF++) {
    for (let colF = 0; colF < 8; colF++) {
      if (positions[rowF][colF]?.name === 'ReineBlanc') {
        let reineMovesJson = JSON.stringify(moveReineBlanc(rowF, colF, positions));
        let reineMovesParsed = JSON.parse(reineMovesJson);

        for (let reineM of reineMovesParsed) {
          for (let roiM of possibleMovesParsed) {
            if (reineM.row === roiM.row && reineM.col === roiM.col) {
              let rowToRemove = reineM.row;
              let colToRemove = reineM.col;
              possibleMoves = possibleMoves.filter((item) => {
                return !(item.row === rowToRemove && item.col === colToRemove);
              });
            }
          }
        }
      }
    }
  }

  // Condition d'échec avec le cavalier blanc
  let possibleMovesCavJSON = JSON.stringify(possibleMoves);
  let possibleMovesParsedCav = JSON.parse(possibleMovesCavJSON);

  for (let rowF = 0; rowF < 8; rowF++) {
    for (let colF = 0; colF < 8; colF++) {
      if (positions[rowF][colF]?.name === 'CavalierBlanc') {
        let reineMovesJson = JSON.stringify(moveCavalierblanc(rowF, colF, positions));
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let reineM of reineMovesParsed) {
          for (let roiM of possibleMovesParsedCav) {
            if (reineM.row === roiM.row && reineM.col === roiM.col) {
              let rowToRemove = reineM.row;
              let colToRemove = reineM.col;
              possibleMoves = possibleMoves.filter((item) => {
                return !(item.row === rowToRemove && item.col === colToRemove);
              });
            }
          }
        }
      }
    }
  }

  return possibleMoves;
}

export const moveRoiBlanc = (row: number, col: number, positions: (Pieces | null)[][], hasMoved: boolean) => {
  let possibleMoves = [];

  const pieceDroite1 = positions[row][col + 1];
  const pieceDroite2 = positions[row][col + 2];
  const pieceDroite3 = positions[row][col + 3];

  const pieceGauche1 = positions[row][col - 1];
  const pieceGauche2 = positions[row][col - 2];
  const pieceGauche3 = positions[row][col - 3];
  const pieceGauche4 = positions[row][col - 4];

  if (!hasMoved) {
    //Petit roque
    if (row === 7 && pieceDroite1 == null && pieceDroite2 == null && pieceDroite3?.name == 'TourBlanc' && pieceGauche1?.name !== 'TourNoir' && pieceGauche2?.name !== 'TourNoir' && pieceGauche3?.name !== 'TourNoir' && pieceGauche4?.name !== 'TourNoir' && pieceGauche1?.name !== 'ReineNoir' && pieceGauche2?.name !== 'ReineNoir' && pieceGauche3?.name !== 'ReineNoir' && pieceGauche4?.name !== 'ReineNoir') {
      let rowP = 6;
      let echecPion = false;
      let echecPiece = false;
      for (let col = 4; col < 8; col++) {
        if (positions[rowP][col]?.name === 'PionNoir') {
          echecPion = true;
        }
      }

      // le cavalier peut mettre en échec le roi entre la row 5 et 7 et entre les col 2 et 7
      for (let row = 5; row < 7; row++) {
        for (let col = 2; col < 8; col++) {
          if (positions[row][col]?.name === 'CavalierNoir') {
            echecPiece = true;
          }
        }
      }

      // on doit vérifier toutes les lignes et toutes les colonnes (pour les fous)
      for (let row = 1; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (positions[row][col]?.name === 'FouNoir') {
            //converti le resultat de la fonction en string JSON
            let fouMovesJson = JSON.stringify(moveFouNoir(row, col, positions));
            //converti la string JSON en objet
            let fouMovesParsed = JSON.parse(fouMovesJson);
            // il faut parcourir 'fouMovesParsed'qui est un tableau d'objet
            for (let fM of fouMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (fM.row === 7 && (fM.col === 4 || fM.col === 5 || fM.col === 6)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      // roque echec tour noir
      for (let row = 0; row < 8; row++) {
        for (let col = 4; col < 8; col++) {
          if (positions[row][col]?.name === 'TourNoir') {
            let tourMovesJson = JSON.stringify(moveTourNoir(row, col, positions));
            let tourMovesParsed = JSON.parse(tourMovesJson);
            for (let tM of tourMovesParsed) {
              if (tM.row === 7 && (tM.col === 4 || tM.col === 5 || tM.col === 6)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      // roque echec reine noir
      for (let row = 0; row < 8; row++) {
        for (let col = 4; col < 8; col++) {
          if (positions[row][col]?.name === 'ReineNoir') {
            let reineMovesJson = JSON.stringify(moveReineNoir(row, col, positions));
            let reineMovesParsed = JSON.parse(reineMovesJson);
            for (let tM of reineMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (tM.row === 7 && (tM.col === 4 || tM.col === 5 || tM.col === 6)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      if (!echecPion && !echecPiece) {
        possibleMoves.push({ row: row, col: col + 2 });
      }
    }
    //Grand roque
    if (row === 7 && pieceGauche1 == null && pieceGauche2 == null && pieceGauche3 == null && pieceGauche4?.name == 'TourBlanc' && pieceDroite1?.name !== 'TourNoir' && pieceDroite2?.name !== 'TourNoir' && pieceDroite3?.name !== 'TourNoir' && pieceDroite1?.name !== 'ReineNoir' && pieceDroite2?.name !== 'ReineNoir' && pieceDroite3?.name !== 'ReineNoir') {
      let rowP = 6;
      let echecPion = false;
      let echecPiece = false;
      for (let col = 1; col < 5; col++) {
        if (positions[rowP][col]?.name === 'PionNoir') {
          echecPion = true;
        }
      }

      // le cavalier peut mettre en échec le roi entre la row 5 et 7 et entre les col 1 et 5
      for (let row = 5; row < 7; row++) {
        for (let col = 1; col < 6; col++) {
          if (positions[row][col]?.name === 'CavalierNoir') {
            echecPiece = true;
          }
        }
      }

      // on doit vérifier toutes les lignes et toutes les colonnes (pour les fous)
      for (let row = 1; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (positions[row][col]?.name === 'FouNoir') {
            //converti le resultat de la fonction en string JSON
            let fouMovesJson = JSON.stringify(moveFouNoir(row, col, positions));
            //converti la string JSON en objet
            let fouMovesParsed = JSON.parse(fouMovesJson);
            // il faut parcourir 'fouMovesParsed'qui est un tableau d'objet
            for (let fM of fouMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (fM.row === 7 && (fM.col === 2 || fM.col === 3 || fM.col === 4)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      // roque echec tour noir
      for (let row = 0; row < 8; row++) {
        for (let col = 2; col < 5; col++) {
          if (positions[row][col]?.name === 'TourNoir') {
            let tourMovesJson = JSON.stringify(moveTourNoir(row, col, positions));
            let tourMovesParsed = JSON.parse(tourMovesJson);
            for (let tM of tourMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (tM.row === 7 && (tM.col === 2 || tM.col === 3 || tM.col === 4)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      for (let row = 0; row < 8; row++) {
        for (let col = 2; col < 5; col++) {
          if (positions[row][col]?.name === 'ReineNoir') {
            let reineMovesJson = JSON.stringify(moveReineNoir(row, col, positions));
            let reineMovesParsed = JSON.parse(reineMovesJson);
            for (let tM of reineMovesParsed) {
              // Si le mouvement du fou est sur la ligne 0 et une colonne entre 4 et 6 alors pas de roque
              if (tM.row === 7 && (tM.col === 2 || tM.col === 3 || tM.col === 4)) {
                echecPiece = true;
              }
            }
          }
        }
      }

      if (!echecPion && !echecPiece) {
        possibleMoves.push({ row: row, col: col - 2 });
      }
    }
  }

  // Vérifier les cases autour du roi
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Vérifier si la case est à l'intérieur du plateau
      if (row + i >= 0 && row + i < 8 && col + j >= 0 && col + j < 8) {
        const piece = positions[row + i][col + j];
        // Vérifier si la case est vide ou contient une pièce ennemie
        if (!piece || (piece && piece.name.indexOf('Noir') !== -1)) {
          possibleMoves.push({ row: row + i, col: col + j });
        }
      }
    }
  }

  let possibleMovesJSON = JSON.stringify(possibleMoves);
  let possibleMovesParsed = JSON.parse(possibleMovesJSON);

  // condition échec reine noir
  for (let rowF = 0; rowF < 8; rowF++) {
    for (let colF = 0; colF < 8; colF++) {
      if (positions[rowF][colF]?.name === 'ReineNoir') {
        let reineMovesJson = JSON.stringify(moveReineNoir(rowF, colF, positions));
        let reineMovesParsed = JSON.parse(reineMovesJson);

        for (let reineM of reineMovesParsed) {
          for (let roiM of possibleMovesParsed) {
            if (reineM.row === roiM.row && reineM.col === roiM.col) {
              let rowToRemove = reineM.row;
              let colToRemove = reineM.col;
              possibleMoves = possibleMoves.filter((item) => {
                return !(item.row === rowToRemove && item.col === colToRemove);
              });
            }
          }
        }
      }
    }
  }

  let possibleMovesCavJSON = JSON.stringify(possibleMoves);
  let possibleMovesParsedCav = JSON.parse(possibleMovesCavJSON);

  // condition échec cavalier noir
  for (let rowF = 0; rowF < 8; rowF++) {
    for (let colF = 0; colF < 8; colF++) {
      if (positions[rowF][colF]?.name === 'CavalierNoir') {
        let reineMovesJson = JSON.stringify(moveCavalierNoir(rowF, colF, positions));
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let reineM of reineMovesParsed) {
          for (let roiM of possibleMovesParsedCav) {
            if (reineM.row === roiM.row && reineM.col === roiM.col) {
              let rowToRemove = reineM.row;
              let colToRemove = reineM.col;
              possibleMoves = possibleMoves.filter((item) => {
                return !(item.row === rowToRemove && item.col === colToRemove);
              });
            }
          }
        }
      }
    }
  }

  let possibleMovesTourJSON = JSON.stringify(possibleMoves);
  let possibleMovesParsedTour = JSON.parse(possibleMovesTourJSON);
  // condition échec tour noir
  for (let rowF = 0; rowF < 8; rowF++) {
    for (let colF = 0; colF < 8; colF++) {
      if (positions[rowF][colF]?.name === 'TourNoir') {
        let reineMovesJson = JSON.stringify(moveTourNoir(rowF, colF, positions));
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let reineM of reineMovesParsed) {
          for (let roiM of possibleMovesParsedTour) {
            if (reineM.row === roiM.row && reineM.col === roiM.col) {
              let rowToRemove = reineM.row;
              let colToRemove = reineM.col;
              possibleMoves = possibleMoves.filter((item) => {
                return !(item.row === rowToRemove && item.col === colToRemove);
              });
            }
          }
        }
      }
    }
  }

  return possibleMoves;
}

export const moveFouBlanc = (row: number, col: number, positions: (Pieces | null)[][]) => {

  const possibleMoves = [];

  // Mouvement en diagonale Haut-Gauche
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    const piece = positions[row - i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row - i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col - i });
  }

  // Mouvement en diagonale Haut-Droite
  for (let i = 1; row - i >= 0 && col + i < 8; i++) {
    const piece = positions[row - i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row - i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col + i });
  }

  // Mouvement en diagonale Bas-Gauche
  for (let i = 1; row + i < 8 && col - i >= 0; i++) {
    const piece = positions[row + i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row + i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col - i });
  }

  // Mouvement en diagonale Bas-Droite
  for (let i = 1; row + i < 8 && col + i < 8; i++) {
    const piece = positions[row + i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row + i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col + i });
  }

  // fou meme ligne roi
  for (let rowT = 0; rowT < 8; rowT++) {
    for (let colT = 0; colT < 8; colT++) {
      const piece = positions[rowT][colT];
      if (piece && piece.name.indexOf('RoiNoir') !== -1) {
        let reineMovesJson = JSON.stringify(possibleMoves);
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let rM of reineMovesParsed) {
          //diagonale bas-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT + 1 });
            }
          }
          //diagonale bas-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT - 1 });
            }
          }
          //diagonale haut-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT + 1 });
            }
          }
          //diagonale haut-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT - 1 });
            }
          }
        }
      }
    }
  }

  return possibleMoves
}

export const moveFouNoir = (row: number, col: number, positions: (Pieces | null)[][]) => {

  const possibleMoves = [];

  // Mouvement en diagonale Haut-Gauche
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    const piece = positions[row - i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row - i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col - i });
  }

  // Mouvement en diagonale Haut-Droite
  for (let i = 1; row - i >= 0 && col + i < 8; i++) {
    const piece = positions[row - i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row - i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col + i });
  }

  // Mouvement en diagonale Bas-Gauche
  for (let i = 1; row + i < 8 && col - i >= 0; i++) {
    const piece = positions[row + i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row + i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col - i });
  }

  // Mouvement en diagonale Bas-Droite
  for (let i = 1; row + i < 8 && col + i < 8; i++) {
    const piece = positions[row + i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row + i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col + i });
  }

  // fou ligne roi
  for (let rowT = 0; rowT < 8; rowT++) {
    for (let colT = 0; colT < 8; colT++) {
      const piece = positions[rowT][colT];
      if (piece && piece.name.indexOf('RoiBlanc') !== -1) {
        let reineMovesJson = JSON.stringify(possibleMoves);
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let rM of reineMovesParsed) {
          //diagonale bas-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT + 1 });
            }
          }
          //diagonale bas-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT - 1 });
            }
          }
          //diagonale haut-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT + 1 });
            }
          }
          //diagonale haut-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT - 1 });
            }
          }
        }
      }
    }
  }

  return possibleMoves
}

export const moveReineNoir = (row: number, col: number, positions: (Pieces | null)[][]) => {

  const possibleMoves = [];

  //Mouvement vers la Droite
  for (let i = col + 1; i < 8; i++) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers la Gauche
  for (let i = col - 1; i >= 0; i--) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers le haut
  for (let i = row - 1; i >= 0; i--) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  //Mouvement vers le bas
  for (let i = row + 1; i < 8; i++) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  // Mouvement en diagonale Haut-Gauche
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    const piece = positions[row - i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row - i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col - i });
  }

  // Mouvement en diagonale Haut-Droite
  for (let i = 1; row - i >= 0 && col + i < 8; i++) {
    const piece = positions[row - i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row - i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col + i });
  }

  // Mouvement en diagonale Bas-Gauche
  for (let i = 1; row + i < 8 && col - i >= 0; i++) {
    const piece = positions[row + i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row + i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col - i });
  }

  // Mouvement en diagonale Bas-Droite
  for (let i = 1; row + i < 8 && col + i < 8; i++) {
    const piece = positions[row + i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Blanc') !== -1) {
        possibleMoves.push({ row: row + i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col + i });
  }

  // ajoute une case de déplacement quand reine = roi
  for (let rowT = 0; rowT < 8; rowT++) {
    for (let colT = 0; colT < 8; colT++) {
      const piece = positions[rowT][colT];
      if (piece && piece.name.indexOf('RoiBlanc') !== -1) {
        let reineMovesJson = JSON.stringify(possibleMoves);
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let rM of reineMovesParsed) {
          // si le roi et la reine sont sur la meme ligne
          if (row === rowT) {
            // row = rowT = ligne roi | rM.row = possibleMove reine
            if (rowT === rM.row) {
              // si on est sur la meme ligne (row) on veux ajouter/enlever une colonne (col)
              possibleMoves.push({ row: rowT, col: colT + 1 }, { row: rowT, col: colT - 1 });
            }
          }
          // si on est sur la meme colonne
          if (col === colT) {
            if (colT === rM.col) {
              possibleMoves.push({ row: rowT + 1, col: colT }, { row: rowT - 1, col: colT });
            }
          }
          //diagonale bas-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT + 1 });
            }
          }
          //diagonale bas-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT - 1 });
            }
          }
          //diagonale haut-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT + 1 });
            }
          }
          //diagonale haut-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT - 1 });
            }
          }
        }
      }
    }
  }

  return possibleMoves
}

export const moveReineBlanc = (row: number, col: number, positions: (Pieces | null)[][]) => {

  const possibleMoves = [];

  //Mouvement vers la Droite
  for (let i = col + 1; i < 8; i++) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers la Gauche
  for (let i = col - 1; i >= 0; i--) {
    const piece = positions[row][i];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row, col: i }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row, col: i });
  }

  //Mouvement vers le haut
  for (let i = row - 1; i >= 0; i--) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  //Mouvement vers le bas
  for (let i = row + 1; i < 8; i++) {
    const piece = positions[i][col];
    if (piece) {
      if (piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: i, col: col }); // Si la pièce est ennemie, la tour peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, la tour ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: i, col: col });
  }

  // Mouvement en diagonale Haut-Gauche
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    const piece = positions[row - i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row - i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col - i });
  }

  // Mouvement en diagonale Haut-Droite
  for (let i = 1; row - i >= 0 && col + i < 8; i++) {
    const piece = positions[row - i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row - i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row - i, col: col + i });
  }

  // Mouvement en diagonale Bas-Gauche
  for (let i = 1; row + i < 8 && col - i >= 0; i++) {
    const piece = positions[row + i][col - i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row + i, col: col - i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col - i });
  }

  // Mouvement en diagonale Bas-Droite
  for (let i = 1; row + i < 8 && col + i < 8; i++) {
    const piece = positions[row + i][col + i];
    if (piece) {
      if (piece && piece.name.indexOf('Noir') !== -1) {
        possibleMoves.push({ row: row + i, col: col + i }); // Si la pièce est ennemie, le fou peut la prendre en se déplaçant sur cette case
      }
      break; // Si la pièce est trouvée, le fou ne peut pas aller plus loin dans cette direction
    }
    possibleMoves.push({ row: row + i, col: col + i });
  }

  for (let rowT = 0; rowT < 8; rowT++) {
    for (let colT = 0; colT < 8; colT++) {
      const piece = positions[rowT][colT];
      if (piece && piece.name.indexOf('RoiNoir') !== -1) {
        let reineMovesJson = JSON.stringify(possibleMoves);
        let reineMovesParsed = JSON.parse(reineMovesJson);
        for (let rM of reineMovesParsed) {
          // si le roi et la reine sont sur la meme ligne
          if (row === rowT) {
            // row = rowT = ligne roi | rM.row = possibleMove reine
            if (rowT === rM.row) {
              // si on est sur la meme ligne (row) on veux ajouter/enlever une colonne (col)
              possibleMoves.push({ row: rowT, col: colT + 1 }, { row: rowT, col: colT - 1 });
            }
          }
          // si on est sur la meme colonne
          if (col === colT) {
            if (colT === rM.col) {
              possibleMoves.push({ row: rowT + 1, col: colT }, { row: rowT - 1, col: colT });
            }
          }
          //diagonale bas-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT + 1 });
            }
          }
          //diagonale bas-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row + i === rowT) {
              possibleMoves.push({ row: rowT + 1, col: colT - 1 });
            }
          }
          //diagonale haut-droite
          for (let i = 0; i < 7; i++) {
            if (col + i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT + 1 });
            }
          }
          //diagonale haut-gauche
          for (let i = 0; i < 7; i++) {
            if (col - i === colT && row - i === rowT) {
              possibleMoves.push({ row: rowT - 1, col: colT - 1 });
            }
          }
        }
      }
    }
  }

  return possibleMoves;
}
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
export const moveRoiNoir = (row: number, col: number, positions: (Pieces | null)[][]) => {
  const possibleMoves = [];

  // Vérifier les cases autour du roi
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Vérifier si la case est à l'intérieur du plateau
      if (row + i >= 0 && row + i < 8 && col + j >= 0 && col + j < 8) {
        const piece = positions[row + i][col + j];
        // Vérifier si la case est vide ou contient une pièce ennemie
        if (!piece || (piece && piece.name.indexOf('Blanc') !== -1)) {
          possibleMoves.push({ row: row + i, col: col + j });
        }
      }
    }
  }

  return possibleMoves;
}

export const moveRoiBlanc = (row: number, col: number, positions: (Pieces | null)[][]) => {
  const possibleMoves = [];

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

  return possibleMoves
}
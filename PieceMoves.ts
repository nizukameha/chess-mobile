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
  console.log(possibleMoves);
  
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
  //resultat
  const possibleMoves = [{}];
  // const pieceDevant1 = positions[row - 1][col - 1];
  // const pieceDevant2 = positions[row - 1][col + 1];

  // //Si il ya une piece devant le pion (a droite ou a gauche) et qu'elle est noir
  // if (pieceDevant1 && pieceDevant1.name.indexOf('Noir') != -1 || pieceDevant2 && pieceDevant2.name.indexOf('Noir') != -1) {
  //   //Si il y a une piece a gauche et une piece a droite alors il peut y aller
  //   if (positions[row - 1][col - 1] && positions[row - 1][col + 1] != null) {
  //     possibleMoves.push({ row: row - 1, col: col - 1 }, { row: row - 1, col: col + 1 });
  //   } 
  //   // Si il y a une piece a gauche alors il peut y aller
  //   else if (positions[row - 1][col - 1] != null) {
  //     possibleMoves.push({ row: row - 1, col: col - 1 });
  //   } 
  //   // Si il y a une piece a droite alors il peut y aller
  //   else if (positions[row - 1][col + 1] != null) {
  //     possibleMoves.push({ row: row - 1, col: col + 1 });
  //   }
  // }
  //Si il y a une piece devant, le pion ne peut pas avancer

  for (let i = 0; i < 12; i++) {
    possibleMoves.push({ row: row, col: col - i });
    possibleMoves.push({ row: row, col: col + i });
    possibleMoves.push({ row: row + i, col: col });
    possibleMoves.push({ row: row - i, col: col });

  }



  return possibleMoves;
}

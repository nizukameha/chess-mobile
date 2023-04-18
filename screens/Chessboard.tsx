import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Pieces } from '../entities';

const moves = {
  'TourNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
  'CavalierNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
  'FouNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
  'ReineNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
  'RoiNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
  'PionNoir': (row: number, col: number) => [{ row: row + 1, col: col }],

  'TourBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
  'CavalierBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
  'FouBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
  'ReineBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
  'RoiBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
  'PionBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
}


export default function Chessboard() {
  // Définir la taille de chaque case de l'échiquier
  const squareSize = 40;

  const [positions, setPositions] = useState<(Pieces | null)[][]>([
    [
      { name: 'TourNoir', src: require('../assets/br.png') },
      { name: 'CavalierNoir', src: require('../assets/bn.png') },
      { name: 'FouNoir', src: require('../assets/bb.png') },
      { name: 'ReineNoir', src: require('../assets/bq.png') },
      { name: 'RoiNoir', src: require('../assets/bk.png') },
      { name: 'FouNoir', src: require('../assets/bb.png') },
      { name: 'CavalierNoir', src: require('../assets/bn.png') },
      { name: 'TourNoir', src: require('../assets/br.png') }
    ],
    [
      { name: 'PionNoir', src: require('../assets/bp.png') },
      { name: 'PionNoir', src: require('../assets/bp.png') },
      { name: 'PionNoir', src: require('../assets/bp.png') },
      { name: 'PionNoir', src: require('../assets/bp.png') },
      { name: 'PionNoir', src: require('../assets/bp.png') },
      { name: 'PionNoir', src: require('../assets/bp.png') },
      { name: 'PionNoir', src: require('../assets/bp.png') },
      { name: 'PionNoir', src: require('../assets/bp.png') }
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    [
      { name: 'PionBlanc', src: require('../assets/wp.png') },
      { name: 'PionBlanc', src: require('../assets/wp.png') },
      { name: 'PionBlanc', src: require('../assets/wp.png') },
      { name: 'PionBlanc', src: require('../assets/wp.png') },
      { name: 'PionBlanc', src: require('../assets/wp.png') },
      { name: 'PionBlanc', src: require('../assets/wp.png') },
      { name: 'PionBlanc', src: require('../assets/wp.png') },
      { name: 'PionBlanc', src: require('../assets/wp.png') }
    ],
    [
      { name: 'TourBlanc', src: require('../assets/wr.png') },
      { name: 'CavalierBlanc', src: require('../assets/wn.png') },
      { name: 'FouBlanc', src: require('../assets/wb.png') },
      { name: 'ReineBlanc', src: require('../assets/wq.png') },
      { name: 'RoiBlanc', src: require('../assets/wk.png') },
      { name: 'FouBlanc', src: require('../assets/wb.png') },
      { name: 'CavalierBlanc', src: require('../assets/wn.png') },
      { name: 'TourBlanc', src: require('../assets/wr.png') }
    ],
  ])

  // Définir les couleurs pour les cases claires et sombres
  const lightSquareColor = '#F0D9B5';
  const darkSquareColor = '#B58863';
  const [isTouched, setIsTouched] = useState<Pieces>();

  const [possibleMove, setPossibleMove] = useState<{row:number; col:number}[]>();

  function selectPiece(row: number, col: number) {
    let piece = positions[row][col];
    if (positions && piece) {
      // console.log(piece.name);
      setIsTouched(piece)
      setPossibleMove(moves[piece.name](row, col));
      console.log(possibleMove);
      

    }

  }

  // Générer les cases de l'échiquier en utilisant deux boucles for
  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // Déterminer la couleur de la case en fonction de sa position sur l'échiquier
      const backgroundColor = (row + col) % 2 === 0 ? lightSquareColor : darkSquareColor;

      squares.push(
        <View key={`${row}-${col}`} style={[styles.square, { backgroundColor, width: squareSize, height: squareSize }]}>
          <TouchableOpacity onPress={() => { selectPiece(row, col) }}>
            {positions && isTouched && positions[row][col] == isTouched
              ? <Image source={positions[row][col]?.src} style={{ width: 40, height: 40, backgroundColor: 'red' }} />
              : <Image source={positions[row][col]?.src} style={{ width: 40, height: 40 }} />}
            {possibleMove.find(item => item.row == row)) && 
            {/* Verifier que les positions possibles (row, col) sont les memes que la case */}
              <Image source={positions[possibleMove.row][possibleMove.col]?.src} style={{ width: 40, height: 40, backgroundColor: 'red' }} />
            }
          </TouchableOpacity>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        {squares}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 320,
    height: 320,
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
});

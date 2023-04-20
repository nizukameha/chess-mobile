import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Pieces } from '../entities';
import { movePionBlanc, movePionNoir } from '../PieceMoves';


export default function Chessboard() {

  const moves = {
    'TourNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
    'CavalierNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
    'FouNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
    'ReineNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
    'RoiNoir': (row: number, col: number) => [{ row: 0, col: 0 }],
    'PionNoir': movePionNoir,

    'TourBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
    'CavalierBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
    'FouBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
    'ReineBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
    'RoiBlanc': (row: number, col: number) => [{ row: 0, col: 0 }],
    'PionBlanc': movePionBlanc
    }
  

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

  const [possibleMove, setPossibleMove] = useState<{ row: number; col: number }[]>();
  const [initialP, setInitialP] = useState({row: -1, col: -1});
  /*
  ** Cette fonction prend en parametre la position de la piece sélectionnée
  */
  function selectPiece(row: number, col: number) {
    let piece = positions[row][col];
    if (positions && piece) {
      setIsTouched(piece)
      setPossibleMove(moves[piece.name](row, col, positions));
      setInitialP({row, col});
    }
  }

  /*
  ** Cette fonction prend en parametre la position du mouvement sélectionné
  ** Il faut intervertir avec setPositions la piece dans le tableau
  */
  function movePiece(row:any, col:any) {
    console.log('row :' + row);
    console.log('col :' + col);
    const clone = JSON.parse(JSON.stringify(positions));
    console.log(initialP);
    
    clone[initialP.row][initialP.col] = null;
    clone[row][col] = isTouched
    setPositions(clone);
    setIsTouched(undefined);
    setPossibleMove(undefined);
    
  }
  
  // Générer les cases de l'échiquier en utilisant deux boucles for
  function generateSquare(){
    
    const squares = [];


    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Déterminer la couleur de la case en fonction de sa position sur l'échiquier
        const backgroundColor = (row + col) % 2 === 0 ? lightSquareColor : darkSquareColor;
        squares.push(
          <View key={`${row}-${col}-${positions[row][col]?.name}`} style={[styles.square, { backgroundColor: backgroundColor, width: squareSize, height: squareSize }]}>
              {/* Une fois qu'une piece est sélectionnée on change la couleur de fond des cases qui sont des mouvements possibles */}
              {possibleMove && possibleMove.find(item => item.row && item.row === row && item.col === col) 
              ?
                <TouchableOpacity onPress={() => movePiece(row, col) }>
                  
                  <Image source={positions[row][col]?.src} style={{ width: 40, height: 40, borderWidth: 2 , borderColor: 'red', borderRadius: 50 }} />

                </TouchableOpacity>
              :
            <TouchableOpacity onPress={() => { selectPiece(row, col) }}>
              {/* Si une piece est sélectionnée la couleur de fond change (en rouge)  */}
              {positions 
                && <Image source={positions[row][col]?.src} style={{ width: 40, height: 40, backgroundColor: isTouched && positions[row][col] == isTouched?'red':'none' }} />}
  
            </TouchableOpacity>
            }
          </View>
        );
      }
    }
    
    return squares;
  }
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        {generateSquare()}
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

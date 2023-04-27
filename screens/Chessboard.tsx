import { io } from "socket.io-client";
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { Pieces } from '../entities';
import { movePionBlanc, movePionNoir, moveTourBlanc, moveTourNoir, moveCavalierNoir, moveCavalierblanc, moveRoiNoir, moveRoiBlanc, moveFouBlanc, moveFouNoir, moveReineNoir, moveReineBlanc } from '../PieceMoves';

export default function Chessboard({ route }: any) {

  const { image } = route.params;
  const { pseudo } = route.params;
  const [socket, setSocket] = useState(io);
  const [myTurn, setMyTurn] = useState(false);
  const [white, setWhite] = useState(false);
  const [showModale, setShowModale] = useState(false);

  useEffect(() => {
    //obligé d'utiliser une var temporaire car les useState sont asynchrones
    let temp = io("ws://10.0.10.64:8000");
    setSocket(temp);
    temp.on('positionsToFront', (data) => {
      setPositions(data);
      setMyTurn(true);
    })
    temp.on('myTurn', (data) => {
      setMyTurn(true);
      setWhite(true);
    })
  }, [])


  const moves = {
    'TourNoir': moveTourNoir,
    'CavalierNoir': moveCavalierNoir,
    'FouNoir': moveFouNoir,
    'ReineNoir': moveReineNoir,
    'RoiNoir': moveRoiNoir,
    'PionNoir': movePionNoir,

    'TourBlanc': moveTourBlanc,
    'CavalierBlanc': moveCavalierblanc,
    'FouBlanc': moveFouBlanc,
    'ReineBlanc': moveReineBlanc,
    'RoiBlanc': moveRoiBlanc,
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
  const [initialP, setInitialP] = useState({ row: -1, col: -1 });

  /*
  ** Cette fonction prend en parametre la position de la piece sélectionnée
  */
  function selectPiece(row: number, col: number) {
    if (myTurn && ((positions[row][col]?.name.indexOf('Blanc') !== -1 && white) || (positions[row][col]?.name.indexOf('Noir') !== -1 && !white))) {
      let piece = positions[row][col];
      if (positions && piece) {
        setIsTouched(piece)
        setPossibleMove(moves[piece.name](row, col, positions));
        setInitialP({ row, col });
      }
    }
  }

  /*
  ** Cette fonction prend en parametre la position du mouvement sélectionné
  ** Il faut intervertir avec setPositions la piece dans le tableau
  */
  function movePiece(row: any, col: any) {
    const clone = JSON.parse(JSON.stringify(positions));
    clone[initialP.row][initialP.col] = null;
    clone[row][col] = isTouched
    setPositions(clone);
    // ENORME PROBLEME UN PION PEUT EN MANGER UN AUTRE (au bout de l'échiquier)
    if ((row === 7 || row === 0) && clone[row][col]?.name.indexOf('Pion') === 0) {
      promotion(row, col);

    }
    setIsTouched(undefined);
    setPossibleMove(undefined);
    socket.emit('positionsToBack', clone);
    setMyTurn(!myTurn);
  }

  const [row, setRow] = useState<any>()
  const [col, setCol] = useState<any>()

  function promotion(row: any, col: any) {
    setShowModale(true)

    setRow(row)
    setCol(col)

    console.log('position promotion', 'row ', row, 'col ', col);

  }

  function selectPromotion(piece: Pieces) {

    console.log('Promotion Piece', piece);

    const clone = JSON.parse(JSON.stringify(positions));
    clone[row][col] = piece;

    setPositions(clone);
    socket.emit('positionsToBack', clone);
    setShowModale(false)
  }

  // Générer les cases de l'échiquier en utilisant deux boucles for
  function generateSquare() {

    const squares = [];


    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Déterminer la couleur de la case en fonction de sa position sur l'échiquier
        const backgroundColor = (row + col) % 2 === 0 ? lightSquareColor : darkSquareColor;
        squares.push(
          <View key={`${row}-${col}-${positions[row][col]?.name}`} style={[styles.square, { backgroundColor: backgroundColor, width: squareSize, height: squareSize }]}>
            {/* Une fois qu'une piece est sélectionnée on change la couleur de fond des cases qui sont des mouvements possibles */}
            {possibleMove && possibleMove.find(item => item.row !== undefined && item.row === row && item.col === col)
              ?
              <TouchableOpacity onPress={() => movePiece(row, col)}>

                <Image source={positions[row][col]?.src} style={{ width: 40, height: 40, borderWidth: 2, borderColor: 'red', borderRadius: 50 }} />

              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { selectPiece(row, col) }}>
                {/* Si une piece est sélectionnée la couleur de fond change (en rouge)  */}
                {positions
                  && <Image source={positions[row][col]?.src} style={{ width: 40, height: 40, backgroundColor: isTouched && positions[row][col] == isTouched ? 'red' : undefined }} />}

              </TouchableOpacity>
            }
          </View>
        );
      }
    }
    return squares;
  }

  const promoPieceNoire: (Pieces | null)[] = [
    { name: 'TourNoir', src: require('../assets/br.png') },
    { name: 'CavalierNoir', src: require('../assets/bn.png') },
    { name: 'FouNoir', src: require('../assets/bb.png') },
    { name: 'ReineNoir', src: require('../assets/bq.png') }
  ]

  const promoPieceBlanche: (Pieces | null)[] = [
    { name: 'TourBlanc', src: require('../assets/wr.png') },
    { name: 'CavalierBlanc', src: require('../assets/wn.png') },
    { name: 'FouBlanc', src: require('../assets/wb.png') },
    { name: 'ReineBlanc', src: require('../assets/wq.png') }
  ]

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Text style={{ fontSize: 25, color: myTurn ? 'red' : 'black' }}>{pseudo}</Text>
          <Image source={{ uri: image.uri }} style={{ width: 80, height: 80, marginBottom: 15 }} />
        </View>

        <View style={styles.container}>
          {generateSquare()}
        </View>

        {!white && showModale && promoPieceNoire.map((item) =>
          <View key={`${item?.name}`} style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => selectPromotion(item)} >
              <Image source={item?.src} style={{ width: 90, height: 90 }} />
            </TouchableOpacity>
          </View>
        )}
        {white && showModale && promoPieceBlanche.map((item) =>
        <View key={`${item?.name}`} style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => selectPromotion(item)} >
            <Image source={item?.src} style={{ width: 90, height: 90 }} />
          </TouchableOpacity>
        </View>
      )}
      </View>
    </>
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

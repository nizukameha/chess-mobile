import { io } from "socket.io-client";
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Animated, Text } from 'react-native';
import { Pieces } from '../entities';
import { movePionBlanc, movePionNoir, moveTourBlanc, moveTourNoir, moveCavalierNoir, moveCavalierblanc, moveRoiNoir, moveRoiBlanc, moveFouBlanc, moveFouNoir, moveReineNoir, moveReineBlanc } from '../PieceMoves';
import * as Haptics from 'expo-haptics';

export default function Chessboard() {

  const [socket, setSocket] = useState(io);
  const [myTurn, setMyTurn] = useState(false);
  const [white, setWhite] = useState(false);
  const [showModale, setShowModale] = useState(false);

  useEffect(() => {
    //obligé d'utiliser une var temporaire car les useState sont asynchrones
    let temp = io("ws://192.168.1.10:8000");
    setSocket(temp);
    // on reçoit la position des pieces depuis le server 
    temp.on('positionsToFront', (data) => {
      setPositions(data);
      setMyTurn(true);
      // on envoit une vibration pour signifier que c'est a notre tour de jouer
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    })
    temp.on('myTurn', (data) => {
      //le 1er connecté reçoit un bool depuis le server qui lui indique qu'il peut jouer le 1er
      setMyTurn(true);
      setWhite(true);
    })
  }, [])

  /* Défini les mouvements possibles pour chaques pieces
  ** moves est un objet qui appel les fonctions pour voir le déplacement possible de chaque pieces
  */
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

  // Défini les pièces disponible pour une promotion
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

  // Défini la taille de chaque case de l'échiquier
  const squareSize = 40;

  // Défini les positions et les pièces sur l'échiquier
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

  // Défini les couleurs pour les cases claires et sombres
  const lightSquareColor = '#F0D9B5';
  const darkSquareColor = '#B58863';
  const [isTouched, setIsTouched] = useState<Pieces>();
  const [possibleMove, setPossibleMove] = useState<{ row: number; col: number }[]>();
  const [initialP, setInitialP] = useState({ row: -1, col: -1 });

  //Permet de definir une position pour la promotion
  const [row, setRow] = useState<any>()
  const [col, setCol] = useState<any>()

  // variable pour savoir si le roi noir ou blanc a déja bouger (pour empecher de roque)
  const [BlackKingHasMoved, setBlackKingHasMoved] = useState(false);
  const [WhiteKingHasMoved, setWhiteKingHasMoved] = useState(false);


 /**
  * Cette fonction prend en parametre la position de la piece sélectionnée
  * @param row ligne
  * @param col colonne
  */
  function selectPiece(row: number, col: number) {
    // si c'est au tour de l'utilisateur de jouer et qu'il choisi la bonne couleur de pieces
    // if (myTurn && ((positions[row][col]?.name.indexOf('Blanc') !== -1 && white) || (positions[row][col]?.name.indexOf('Noir') !== -1 && !white))) {
      let piece = positions[row][col];
      if (positions && piece) {
        setIsTouched(piece);
        if (piece.name == 'RoiNoir') {
          setPossibleMove(moves[piece.name](row, col, positions, BlackKingHasMoved));
        } else if (piece.name == 'RoiBlanc') {
          setPossibleMove(moves[piece.name](row, col, positions, WhiteKingHasMoved));
        } else {
          setPossibleMove(moves[piece.name](row, col, positions));
        }
        setInitialP({ row, col });
      }
    //}
  }


  /**
   * Cette fonction prend en parametre la position du mouvement sélectionné
   * Il faut intervertir avec setPositions la piece dans le tableau
   * @param row 
   * @param col 
   */
  function movePiece(row: any, col: any) {
    // recupere le tableau de position des pieces et en fait un clone
    const clone = JSON.parse(JSON.stringify(positions));
    // la position de la piece qui vient de bougé est supprimé du tableau (case vide)
    clone[initialP.row][initialP.col] = null;
    clone[row][col] = isTouched;
    // si le roi n'a pas encore bougé
    if (!BlackKingHasMoved) {
      /* Magnifique PETIT ROQUE <3 
      ** verifie si le roi vient de bouger de 2 cases sur le coté et sur la meme ligne
      ** Si c'est bien le cas cela veux dire que le joueur souhaite faire un roque
      */
      if (clone[row][col]?.name == 'RoiNoir' && clone[row][initialP.col + 2] == clone[row][col]) {
        // recupere la position de la tour
        let tour = clone[row][col + 1];
        // deplace la tour pour terminer le roque
        clone[row][col + 1] = null;
        clone[row][col - 1] = tour;
      }
      // Magnifique GRAND ROQUE <3 (comme au dessus mais pour le roque avec la tour a gauche)
      if (clone[row][col]?.name == 'RoiNoir' && clone[row][initialP.col - 2] == clone[row][col]) {
        let tour = clone[row][col - 2];
        clone[row][col - 2] = null;
        clone[row][col + 1] = tour;
      }
    }
    // roque blanc
    if (!WhiteKingHasMoved) {
      if (clone[row][col]?.name == 'RoiBlanc' && clone[row][initialP.col + 2] == clone[row][col]) {
        let tour = clone[row][col + 1];
        clone[row][col + 1] = null;
        clone[row][col - 1] = tour;
      }
      if (clone[row][col]?.name == 'RoiBlanc' && clone[row][initialP.col - 2] == clone[row][col]) {
        let tour = clone[row][col - 2];
        clone[row][col - 2] = null;
        clone[row][col + 1] = tour;
      }
    }
    // le tableau de position se met a jour
    setPositions(clone);
    // si un pion arrive au bout de l'échiquier il peut etre promu
    if ((row === 7 || row === 0) && clone[row][col]?.name.indexOf('Pion') === 0) {
      promotion(row, col);
    }
    // la piece ne peut plus bouger
    setIsTouched(undefined);
    setPossibleMove(undefined);
    // on envoit le tableau vers le server pour qu'il le renvoit a l'autre joueur
    socket.emit('positionsToBack', clone);
    // Ce n'est plus au joueur actuel de jouer
    setMyTurn(!myTurn);
    if (clone[row][col]?.name == 'RoiBlanc') {
      setWhiteKingHasMoved(true);
    }
    if (clone[row][col]?.name == 'RoiNoir') {
      setBlackKingHasMoved(true);
    }
  }

  /**
   * Cette fonction prend en parametre la position du mouvement sélectionné
   * Elle permet d'ouvrir une modale pour la selection de la promotion et d'ensuite assigner row et col aux useState row et col
   * @param row 
   * @param col 
   */
  function promotion(row: any, col: any) {
    // une modale apparait pour sélectionner la piece qui va prendre la place du pion
    setShowModale(true)
    setRow(row)
    setCol(col)
  }

  /**
   * Cette fonction fait la promotion puis masque la modale
   * @param piece J'attend une piece en argument
   */
  function selectPromotion(piece: Pieces) {
    const clone = JSON.parse(JSON.stringify(positions));
    // le pion est remplacé par la piece sélectionnée
    clone[row][col] = piece;
    setPositions(clone);
    // envoit vers le server le tableau de position des pieces
    socket.emit('positionsToBack', clone);
    // ferme la modale
    setShowModale(false)
  }

  /**
   * Générer les cases de l'échiquier en utilisant deux boucles for
   * @returns 
   */
  function generateSquare() {
    // tableau qui va contenir les cases de l'échiquier
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
              // ces cases de l'échiquier pourront accueillir le mouvement potentiel d'une piece
              <TouchableOpacity onPress={() => movePiece(row, col)}>
                {/* pour le représenter visuellement, les cases on un rond rouge */}
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

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          {/* génération de l'échiquier */}
          {generateSquare()}
        </View>

        <View style={{ flexDirection: 'row', position: 'absolute' }}>
          {/* génération des pieces blanches pour une promotions */}
          {white && showModale && promoPieceBlanche.map((item) =>
            <TouchableOpacity key={`${item?.name}`} onPress={() => selectPromotion(item)}>
              <Image source={item?.src} style={{ width: 90, height: 90, backgroundColor: "grey" }} />
            </TouchableOpacity>
          )
          }
        </View>

        <View style={{ flexDirection: 'row', position: 'absolute' }}>
          {/* génération des pieces noires pour une promotions */}
          {!white && showModale && promoPieceNoire.map((item) =>
            <TouchableOpacity onPress={() => selectPromotion(item)} >
              <Image source={item?.src} style={{ width: 90, height: 90, backgroundColor: "grey" }} />
            </TouchableOpacity>
          )}
        </View>

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
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 2,
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

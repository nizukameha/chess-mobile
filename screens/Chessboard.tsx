import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Chessboard() {
  // Définir la taille de chaque case de l'échiquier
  const squareSize = 40;

  // Définir les couleurs pour les cases claires et sombres
  const lightSquareColor = '#F0D9B5';
  const darkSquareColor = '#B58863';

  // Générer les cases de l'échiquier en utilisant deux boucles for
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // Déterminer la couleur de la case en fonction de sa position sur l'échiquier
      const backgroundColor = (row + col) % 2 === 0 ? lightSquareColor : darkSquareColor;
      
      switch (row) {
        case 1 :
          squares.push(
            <View key={`${row}-${col}`} style={[styles.square, {backgroundColor, width: squareSize, height: squareSize}]}>
              <Image source={require('../assets/bp.png')} style={{width: 40, height: 40}}/>
            </View>
          );
          break;
        case 6 :
          squares.push(
            <View key={`${row}-${col}`} style={[styles.square, {backgroundColor, width: squareSize, height: squareSize}]}>
              <Image source={require('../assets/wp.png')} style={{width: 40, height: 40}}/>
            </View>
          );
          break;
        default:
          squares.push(
            <View key={`${row}-${col}`} style={[styles.square, {backgroundColor, width: squareSize, height: squareSize}]}>
              {/* Ajouter le texte pour représenter la position de la case */}
              <Text style={styles.text}>{`${row}${col}`}</Text>
            </View>
          );
      }
    }
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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

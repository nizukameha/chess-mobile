import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {

  const changePage = () => {
    navigation.navigate('Chess')
  }



  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Jouer" onPress={changePage} />
      </View>
    </>
  );
}
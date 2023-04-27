import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Button, TouchableOpacity, Image, TextInput } from 'react-native';

export default function HomeScreen({ navigation }: any) {

  const rick = require('../assets/rick.jpg');
  const [image, setImage] = useState(rick);
  const [pseudo, setPseudo] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result);
  };

  const changePage = () => {
    navigation.navigate('Chess', {image, pseudo})
  }



  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Entrez votre pseudo:</Text>
      <TextInput
        placeholder="Pseudo"
        onChangeText={(text) => setPseudo(text)}
        value={pseudo}
      />
      <Button title="Choisir une photo" onPress={pickImage} />
        <Button title="Jouer" onPress={changePage} />
      </View>
    </>
  );
}
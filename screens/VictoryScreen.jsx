/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChoiceButton from '../layout/ChoiceButton';

const VictoryScreen = ({ navigation, route }) => {
 const params = route ? route.params : null;

 const onReturnToMainHallway = params ? params.onReturnToMainHallway : null;

  console.log('VictoryScreen rendered');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Victory!</Text>
      <ChoiceButton title='Continue' onPress={onReturnToMainHallway}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'MedievalSharp-Regular',
    fontSize: 40,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#808080',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'MedievalSharp-Regular',
    textAlign: 'center',
  },
});

export default VictoryScreen;

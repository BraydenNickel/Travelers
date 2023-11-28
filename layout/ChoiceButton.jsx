/*Global layout for the four main choice buttons*/

import React from "react";
import { TouchableOpacity, Text} from "react-native";
import { StyleSheet } from 'react-native';

const ChoiceButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.choiceContainer} onPress={onPress}>
            <Text style={styles.choiceText}>{ title }</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    choiceContainer: {
        backgroundColor: 'rgba(90, 90, 90, 1)',
        borderRadius: 20,
        marginBottom: 20,
        height: 40,
        width: 310,
        alignItems: 'center',
        justifyContent: 'center',
    },
    choiceText: {
       color: 'white',
       fontSize: 18,
       textAlign: 'center',
       fontFamily: 'MedievalSharp-Regular',
    },
});

export default ChoiceButton;
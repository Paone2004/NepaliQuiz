import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Option = ({ option, isSelected, isCorrect, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.option,
                isSelected && styles.selectedOption,
                isCorrect && styles.correctOption,
            ]}
            onPress={onPress}

        >
            <Text style={styles.optionText}>{decodeURIComponent(option)}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    option: {
        height: 50,
        width: '100%',
        borderRadius: 6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    selectedOption: {
        borderWidth: 3,
    },
    correctOption: {
        backgroundColor: 'rgba(7, 162, 18, 0.3)'
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: 'black',
    }
});

export default Option;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ToggleModeButton = ({ onPress, isLightMode }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {isLightMode ? (
                <Feather name="moon" size={24} color="#fff" />
            ) : (
                <Feather name="sun" size={24} color="#fff" />
            )}
        </TouchableOpacity>
    );
};

export default ToggleModeButton;
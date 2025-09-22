import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Language = ({ navigation }) => {
    return (
        <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Choose a Language</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Menu', { language: 'nepali' })}
                >
                    <Text style={styles.buttonText}>नेपाली</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Menu', { language: 'english' })}
                >
                    <Text style={styles.buttonText}>English</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default Language;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        marginBottom: 50,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 1.2,
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f9a826',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
});

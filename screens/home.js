import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../components/title';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {
    const [scaleValue] = useState(new Animated.Value(1));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <LinearGradient colors={['#6A82FB', '#FC5C7D']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Title />
                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <Image style={styles.image} source={require('../logo.png')} />
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between',
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    button: {
        marginTop: 30,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4C3BCF',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
});
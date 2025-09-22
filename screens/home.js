import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Title from '../components/title';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Breathing animation for the logo
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.05,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Slide-in animation for the image
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.poly(4)),
            useNativeDriver: true,
        }).start();

        // Fade-in animation for title and button
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            delay: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, []);

    const imageStyle = {
        transform: [
            { scale: scaleValue },
            {
                translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-300, 0],
                }),
            },
        ],
        opacity: slideAnim,
    };

    const textContainerStyle = {
        opacity: fadeAnim,
    };

    return (
        <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={textContainerStyle}>
                    <Title />
                </Animated.View>
                <Animated.View style={imageStyle}>
                    <Image style={styles.image} source={require('../logo.png')} />
                </Animated.View>
                <Animated.View style={[styles.buttonContainer, textContainerStyle]}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </Animated.View>
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
        justifyContent: 'space-around',
        padding: 20,
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 125,
        borderWidth: 5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        height: 60,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9a826',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
});
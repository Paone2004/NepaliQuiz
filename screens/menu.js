import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons'; // For icons

import GeographyImage from '../assets/images/Geography.jpg';
import ScienceImage from '../assets/images/Science.jpg';
import HistoryImage from '../assets/images/History.jpg';
import InternationalImage from '../assets/images/International.jpg';

const { width } = Dimensions.get('window');

const options = [
    {
        id: 1,
        title: 'Geography',
        color: ['rgba(41, 128, 185, 0.7)', 'rgba(52, 152, 219, 0.3)'], // Dimmed colors
        description: 'Explore the world\'s landscapes and cultures',
        icon: 'public',
    },
    {
        id: 2,
        title: 'Science',
        color: ['rgba(39, 174, 96, 0.7)', 'rgba(46, 204, 113, 0.3)'], // Dimmed colors
        description: 'Discover scientific wonders and innovations',
        icon: 'science',
    },
    {
        id: 3,
        title: 'History',
        color: ['rgba(243, 156, 18, 0.7)', 'rgba(211, 84, 0, 0.3)'], // Dimmed colors
        description: 'Journey through time and civilizations',
        icon: 'history',
    },
    {
        id: 4,
        title: 'International',
        color: ['rgba(142, 68, 173, 0.7)', 'rgba(155, 89, 182, 0.3)'], // Dimmed colors
        description: 'Explore global connections and diversity',
        icon: 'language',
    },
];

const images = {
    Geography: GeographyImage,
    Science: ScienceImage,
    History: HistoryImage,
    International: InternationalImage,
};

const Menu = ({ navigation }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleOptionPress = (option) => {
        // Animation on press
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.navigate('Quiz', { category: option.title });
        });
    };

    return (
        <LinearGradient
            colors={['#f5f7fa', '#c3cfe2']}
            style={styles.container}
        >
            {/* Fixed Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Choose Your Quiz Category</Text>
            </View>

            {/* Scrollable Options */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {options.map(option => (
                    <TouchableOpacity
                        key={option.id}
                        activeOpacity={0.7}
                        onPress={() => handleOptionPress(option)}
                    >
                        <Animated.View style={[styles.option, { transform: [{ scale: scaleAnim }] }]}>
                            <ImageBackground
                                source={images[option.title]}
                                style={styles.image}
                                imageStyle={styles.imageBackground}
                            >
                                <BlurView intensity={100} style={styles.blurOverlay}>
                                    <LinearGradient
                                        colors={option.color}
                                        style={styles.textContainer}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    >
                                        <MaterialIcons name={option.icon} size={30} color="white" style={styles.icon} />
                                        <Text style={styles.optionText}>{option.title}</Text>
                                        <Text style={styles.descriptionText}>{option.description}</Text>
                                    </LinearGradient>
                                </BlurView>
                            </ImageBackground>
                        </Animated.View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'transparent',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        color: '#2c3e50',
        letterSpacing: 1,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    option: {
        height: 250,
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageBackground: {
        borderRadius: 20,
    },
    blurOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    textContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 0,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
        letterSpacing: 0.5,
    },
    descriptionText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },
    icon: {
        marginBottom: 10,
    },
});
import React, { useRef, useEffect } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';

import GeographyImage from '../assets/images/Geography.jpg';
import ScienceImage from '../assets/images/Science.jpg';
import HistoryImage from '../assets/images/History.jpg';
import InternationalImage from '../assets/images/International.jpg';
import PoliticsImage from '../assets/images/Politics.jpg';

const { width } = Dimensions.get('window');

const options = [
    {
        id: 1,
        title: 'Geography',
        color: ['#4c669f', '#3b5998', '#192f6a'],
        description: 'Explore the world\'s landscapes and cultures',
        icon: 'public',
    },
    {
        id: 2,
        title: 'Science',
        color: ['#2E7D32', '#4CAF50', '#81C784'],
        description: 'Discover scientific wonders and innovations',
        icon: 'science',
    },
    {
        id: 3,
        title: 'History',
        color: ['#f5af19', '#f12711'],
        description: 'Journey through time and civilizations',
        icon: 'history',
    },
    {
        id: 4,
        title: 'International',
        color: ['#8e2de2', '#4a00e0'],
        description: 'Explore global connections and diversity',
        icon: 'language',
    },
    {
        id: 5,
        title: 'Politics',
        color: ['#d32f2f', '#c2185b', '#ad1457'],
        description: 'Test your knowledge of politics',
        icon: 'gavel',
    },
];

const images = {
    Geography: GeographyImage,
    Science: ScienceImage,
    History: HistoryImage,
    International: InternationalImage,
    Politics: PoliticsImage,
};

const Menu = ({ route, navigation }) => {
    const { language } = route.params;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const slideAnims = useRef(options.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        Animated.stagger(
            150,
            slideAnims.map(anim =>
                Animated.spring(anim, {
                    toValue: 1,
                    friction: 5,
                    tension: 40,
                    useNativeDriver: true,
                })
            )
        ).start();
    }, []);

    const handleOptionPress = (option) => {
        navigation.navigate('Quiz', { category: option.title, language });
    };

    return (
        <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Choose a Category</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {options.map((option, index) => (
                    <Animated.View
                        key={option.id}
                        style={{
                            transform: [
                                {
                                    translateY: slideAnims[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [150, 0],
                                    }),
                                },
                            ],
                            opacity: slideAnims[index],
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleOptionPress(option)}
                        >
                            <ImageBackground
                                source={images[option.title]}
                                style={styles.option}
                                imageStyle={styles.imageBackground}
                            >
                                <LinearGradient
                                    colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'transparent']}
                                    style={styles.gradientOverlay}
                                >
                                    <View style={styles.textContainer}>
                                        <MaterialIcons name={option.icon} size={40} color="white" style={styles.icon} />
                                        <Text style={styles.optionText}>{option.title}</Text>
                                        <Text style={styles.descriptionText}>{option.description}</Text>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    </Animated.View>
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
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 1.2,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    option: {
        height: 200,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 25,
        justifyContent: 'flex-end',
    },
    imageBackground: {
        borderRadius: 25,
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textContainer: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    optionText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    descriptionText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});
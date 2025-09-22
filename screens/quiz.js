import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Option from '../components/option';
import geographyData from '../components/questions/geography.json';
import historyData from '../components/questions/history.json';
import scienceData from '../components/questions/science.json';
import internationalData from '../components/questions/international.json';
import politicsData from '../components/questions/politics.json';
import enGeographyData from '../components/questions/en_geography.json';
import enHistoryData from '../components/questions/en_history.json';
import enScienceData from '../components/questions/en_science.json';
import enInternationalData from '../components/questions/en_international.json';
import enPoliticsData from '../components/questions/en_politics.json';

const Quiz = ({ route, navigation }) => {
    const { category, language } = route.params;
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [showCheckAnswer, setShowCheckAnswer] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const getQuizFromLocal = () => {
        const nepaliQuestions = {
            Geography: geographyData,
            History: historyData,
            Science: scienceData,
            International: internationalData,
            Politics: politicsData,
        };

        const englishQuestions = {
            Geography: enGeographyData,
            History: enHistoryData,
            Science: enScienceData,
            International: enInternationalData,
            Politics: enPoliticsData,
        };

        const questionsData =
            language === 'english'
                ? englishQuestions[category]
                : nepaliQuestions[category];

        setQuestions(questionsData);
        setLoading(false);
        shuffleOptions(questionsData[0]);
    }

    const shuffleOptions = (question) => {
        const options = [...question.incorrect_answers, question.correct_answer];
        options.sort(() => Math.random() - 0.5);
        setShuffledOptions(options);
    }

    const handleNext = () => {
        if (number < questions.length - 1) {
            fadeOut();
            setTimeout(() => {
                setNumber(number + 1);
                setSelectedOption(null);
                setShowCheckAnswer(false);
                setShowCorrectAnswer(false);
                shuffleOptions(questions[number + 1]);
                fadeIn();
            }, 200);
        }
    }

    const handleCheckAnswerPress = () => {
        setShowCorrectAnswer(true);
        if (decodeURIComponent(selectedOption) === decodeURIComponent(questions[number].correct_answer)) {
            setScore(score + 1);
        }
    }

    const handleResultsPress = () => {
        navigation.navigate('Result', {
            score,
            totalQuestions: questions.length,
            category
        });
    }

    useEffect(() => {
        getQuizFromLocal();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366f1" />
                <Text style={styles.loadingText}>Loading {category} Quiz...</Text>
            </View>
        );
    }

    if (!questions[number]) {
        return null;
    }

    const currentQuestion = questions[number];
    const correctAnswer = decodeURIComponent(currentQuestion.correct_answer);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.categoryText}>{category}</Text>
                <Text style={styles.scoreText}>Score: {score}</Text>
            </View>

            <View style={styles.progress}>
                <View style={[styles.progressBar, { width: `${((number + 1) / questions.length) * 100}%` }]} />
            </View>

            <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
                <View style={styles.questionView}>
                    <Text style={styles.questionNumber}>Question {number + 1}/{questions.length}</Text>
                    <Text style={styles.question}>{decodeURIComponent(currentQuestion.question)}</Text>
                </View>

                <View style={styles.optionView}>
                    {shuffledOptions.map((option, index) => (
                        <Option
                            key={index}
                            option={option}
                            isSelected={selectedOption === option}
                            isCorrect={showCorrectAnswer && correctAnswer === decodeURIComponent(option)}
                            onPress={() => {
                                setSelectedOption(option);
                                setShowCheckAnswer(true);
                            }}
                        />
                    ))}
                </View>
            </Animated.View>

            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={[styles.button, styles.skip]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>

                {showCheckAnswer && !showCorrectAnswer && (
                    <TouchableOpacity
                        style={[styles.button, styles.checkAnswer]}
                        onPress={handleCheckAnswerPress}
                    >
                        <Text style={styles.buttonText}>Check Answer</Text>
                    </TouchableOpacity>
                )}

                {showCorrectAnswer && (
                    number < questions.length - 1 ? (
                        <TouchableOpacity
                            style={[styles.button, styles.continue]}
                            onPress={handleNext}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, styles.results]}
                            onPress={handleResultsPress}
                        >
                            <Text style={styles.buttonText}>See Results</Text>
                        </TouchableOpacity>
                    )
                )}
            </View>
        </SafeAreaView>
    );
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e', // Dark theme
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2c2c2c',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f9a826', // Accent color
    },
    progress: {
        height: 8,
        backgroundColor: '#444',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#f9a826',
        borderRadius: 4,
    },
    mainContent: {
        flex: 1,
        padding: 20,
    },
    questionView: {
        marginVertical: 20,
        padding: 20,
        backgroundColor: '#2c2c2c',
        borderRadius: 15,
    },
    questionNumber: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 30,
    },
    optionView: {
        marginTop: 20,
    },
    buttonView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#2c2c2c',
    },
    button: {
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    skip: {
        backgroundColor: '#d32f2f',
    },
    checkAnswer: {
        backgroundColor: '#f57c00',
    },
    continue: {
        backgroundColor: '#388e3c',
    },
    results: {
        backgroundColor: '#1976d2',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
    },
});
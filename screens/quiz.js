import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Option from '../components/option';
import geographyData from '../components/questions/geography.json';
import historyData from '../components/questions/history.json';
import scienceData from '../components/questions/science.json';
import internationalData from '../components/questions/international.json';

const Quiz = ({ route, navigation }) => {
    const { category } = route.params;
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

    const getQuizFromLocal = async () => {
        let questionsData;
        switch (category) {
            case 'Geography':
                questionsData = geographyData;
                break;
            case 'History':
                questionsData = historyData;
                break;
            case 'Science':
                questionsData = scienceData;
                break;
            case 'International':
                questionsData = internationalData;
                break;
            default:
                questionsData = [];
        }

        await AsyncStorage.setItem(category, JSON.stringify(questionsData));
        setQuestions(questionsData);
        setLoading(false);
        shuffleOptions(questionsData[0]);
    }

    const shuffleOptions = (question) => {
        const options = [...question.incorrect_answers, question.correct_answer];
        options.sort(() => Math.random() - 0.5);
        setShuffledOptions(options);
    }

    const handleNextPress = () => {
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

    const handleSkipPress = () => {
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

    const handleResultsPress = () => {
        navigation.navigate('Result', {
            score,
            totalQuestions: questions.length,
            category
        });
    }

    useEffect(() => {
        getQuizFromLocal(); // Changed from getQuiz() to directly calling getQuizFromLocal()
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
                    onPress={handleSkipPress}
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
                            onPress={handleNextPress}
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
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    scoreText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6366f1',
    },
    progress: {
        height: 4,
        backgroundColor: '#e2e8f0',
        width: '100%',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#6366f1',
        borderRadius: 2,
    },
    mainContent: {
        flex: 1,
        padding: 20,
    },
    questionView: {
        marginVertical: 20,
    },
    questionNumber: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 8,
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        lineHeight: 32,
    },
    optionView: {
        width: '100%',
        marginTop: 20,
    },
    buttonView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    button: {
        height: 48,
        flex: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        elevation: 2,
    },
    skip: {
        backgroundColor: '#ef4444',
    },
    checkAnswer: {
        backgroundColor: '#f59e0b',
    },
    continue: {
        backgroundColor: '#10b981',
    },
    results: {
        backgroundColor: '#6366f1',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#64748b',
    },
});
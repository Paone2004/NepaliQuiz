import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Result = ({ route, navigation }) => {
    const { score, totalQuestions, category } = route.params;
    const percentage = Math.round((score / totalQuestions) * 100);

    const getResultMessage = () => {
        if (percentage >= 90) return "Outstanding!";
        if (percentage >= 80) return "Excellent!";
        if (percentage >= 70) return "Great job!";
        if (percentage >= 60) return "Good effort!";
        return "Keep practicing!";
    };

    const getResultColor = () => {
        if (percentage >= 90) return '#10b981';
        if (percentage >= 80) return '#6366f1';
        if (percentage >= 70) return '#f59e0b';
        if (percentage >= 60) return '#f97316';
        return '#ef4444';
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.categoryText}>{category} Quiz</Text>
            </View>

            <View style={styles.resultCard}>
                <Text style={styles.messageText}>{getResultMessage()}</Text>
                <Text style={[styles.scoreText, { color: getResultColor() }]}>
                    {score}/{totalQuestions}
                </Text>
                <Text style={styles.percentageText}>{percentage}%</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Correct</Text>
                    <Text style={[styles.statValue, { color: '#10b981' }]}>{score}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Incorrect</Text>
                    <Text style={[styles.statValue, { color: '#ef4444' }]}>
                        {totalQuestions - score}
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.retryButton]}
                    onPress={() => navigation.replace('Quiz', { category })}
                >
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.homeButton]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Result;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e', // Dark theme
    },
    header: {
        padding: 20,
        backgroundColor: '#2c2c2c',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    resultCard: {
        margin: 20,
        padding: 30,
        backgroundColor: '#2c2c2c',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    messageText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    percentageText: {
        fontSize: 24,
        color: '#aaa',
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        padding: 20,
        backgroundColor: '#2c2c2c',
        borderRadius: 20,
        elevation: 10,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#444',
        marginHorizontal: 10,
    },
    buttonContainer: {
        padding: 20,
        marginTop: 20,
    },
    button: {
        height: 55,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    retryButton: {
        backgroundColor: '#1976d2',
    },
    homeButton: {
        backgroundColor: '#444',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});
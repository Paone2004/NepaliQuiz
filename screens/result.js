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
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    resultCard: {
        margin: 20,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2,
    },
    messageText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 16,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    percentageText: {
        fontSize: 20,
        color: '#64748b',
    },
    statsContainer: {
        flexDirection: 'row',
        margin: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e2e8f0',
        marginHorizontal: 16,
    },
    buttonContainer: {
        padding: 20,
    },
    button: {
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
    },
    retryButton: {
        backgroundColor: '#6366f1',
    },
    homeButton: {
        backgroundColor: '#64748b',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
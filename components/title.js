import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = () => {
    return (
        <View>
            <Text style={styles.title}>Welcome to Nepali Quiz</Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        fontSize: 36,
        fontWeight: 'bold',
        color: 'brown',
        textAlign: 'center'
    }
})
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Profile(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Hello, User</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
    },
    title: {
        fontWeight:'bold',
        textAlign: 'center',
    },
})
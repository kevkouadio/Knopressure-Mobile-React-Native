import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getUserProfile } from '../service';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = ({ navigation, userId }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        getUserProfile(userId)
            .then((response) => {
                setUser(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Landing' }],
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getInitials = (name) => {
        if (!name) return '';
        const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
        return initials;
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={styles.initials}>{getInitials(user.username)}</Text>
            </View>
            <Text style={styles.text}>{user.username}</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'plum',
    },
    iconContainer: {
        backgroundColor: 'white',
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        fontSize: 100,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'plum'
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
    },
});

import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from '../colors';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Home = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
            ),
            // headerRight: () => (
            //     <Image
            //         source={}
            //         style={{
            //             width: 40,
            //             height: 40,
            //             marginRight: 15,
            //         }}
            //     />
            // ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                {/* <Entypo name="chat" size={24} color={colors.lightGray} /> */}
            </TouchableOpacity>
        </View>
    );
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });
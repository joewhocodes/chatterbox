import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import { auth } from '../firebase/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
const backImage = require('../assets/backImage.png');

const Signup = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [avatar, setAvatar] = useState('');

	const handleSignup = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				// Registered
				const user = userCredential.user;
				updateProfile(user, {
					displayName: name,
					photoURL: avatar
						? avatar
						: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
				})
					.then(() => {
						signInWithEmailAndPassword(auth, email, password)
							.then(userCredential => {
								navigation.navigate('Chat');
							})
							.catch(error => {
								const errorCode = error.code;
								const errorMessage = error.message;
								alert(errorMessage);
							});
					})
					.catch(error => {
						alert(error.message);
					});
			})
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};

	return (
		<View style={styles.container}>
			<Image source={backImage} style={styles.backImage} />
			<View style={styles.whiteSheet} />
			<SafeAreaView style={styles.form}>
				<Text style={styles.title}>Sign Up</Text>
				<TextInput
					style={styles.input}
					placeholder='Enter email'
					autoCapitalize='none'
					keyboardType='email-address'
					textContentType='emailAddress'
					autoFocus={true}
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder='Enter password'
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					textContentType='password'
					value={password}
					onChangeText={text => setPassword(text)}
				/>
				<TouchableOpacity style={styles.button} onPress={handleSignup}>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#fff',
							fontSize: 18,
						}}>
						{' '}
						Sign Up
					</Text>
				</TouchableOpacity>
				<View
					style={{
						marginTop: 20,
						flexDirection: 'row',
						alignItems: 'center',
						alignSelf: 'center',
					}}>
					<Text
						style={{
							color: 'gray',
							fontWeight: '600',
							fontSize: 14,
						}}>
						Don't have an account?{' '}
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate('Login')}>
						<Text
							style={{
								color: '#f57c00',
								fontWeight: '600',
								fontSize: 14,
							}}>
							{' '}
							Log In
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			<StatusBar barStyle='light-content' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: 'orange',
		alignSelf: 'center',
		paddingBottom: 24,
	},
	input: {
		backgroundColor: '#F6F7FB',
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
	backImage: {
		width: '100%',
		height: 340,
		position: 'absolute',
		top: 0,
		resizeMode: 'cover',
	},
	whiteSheet: {
		width: '100%',
		height: '75%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 60,
	},
	form: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	button: {
		backgroundColor: '#f57c00',
		height: 58,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
});

export default Signup;

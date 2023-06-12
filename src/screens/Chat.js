import React, { useState, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
	collection,
	addDoc,
	orderBy,
	query,
	onSnapshot,
} from 'firebase/firestore';
import { signOut } from '../firebase/firebase';
import { auth, database } from '../firebase/firebase';
import { useNavigation } from '@react-navigation/native';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Chat() {
	const [messages, setMessages] = useState([]);
	const navigation = useNavigation();

	const onSignOut = () => {
		signOut(auth).catch(error => console.log('Error logging out: ', error));
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{
						marginRight: 10,
					}}
					onPress={onSignOut}>
					<FontAwesomeIcon icon={faRightFromBracket} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	useLayoutEffect(() => {
		const collectionRef = collection(database, 'chats');
		const q = query(collectionRef, orderBy('createdAt', 'desc'));

		const unsubscribe = onSnapshot(q, querySnapshot => {
			console.log('querySnapshot unsusbscribe');
			setMessages(
				querySnapshot.docs.map(doc => ({
					_id: doc.data()._id,
					createdAt: doc.data().createdAt.toDate(),
					text: doc.data().text,
					user: doc.data().user,
				}))
			);
		});
		return unsubscribe;
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, messages)
		);
		// setMessages([...messages, ...messages]);
		const { _id, createdAt, text, user } = messages[0];
		addDoc(collection(database, 'chats'), {
			_id,
			createdAt,
			text,
			user,
		});
	}, []);

	return (
		// <>
		//   {messages.map(message => (
		//     <Text key={message._id}>{message.text}</Text>
		//   ))}
		// </>
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage={false}
			showUserAvatar={false}
			onSend={messages => onSend(messages)}
			messagesContainerStyle={{
				backgroundColor: '#fff',
			}}
			textInputStyle={{
				backgroundColor: '#fff',
				borderRadius: 20,
			}}
			user={{
				_id: auth?.currentUser?.email,
				avatar: 'https://i.pravatar.cc/300',
			}}
		/>
	);
}

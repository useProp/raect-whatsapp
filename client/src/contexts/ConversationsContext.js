import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ContactsContext } from './ContactsContext';
import { arrayEquality } from '../utils/arrayEquality';
import { SocketContext } from './SocketProvider';

export const ConversationsContext = createContext(null);

export const ConversationsProvider = ({ children, id }) => {
	const [conversations, setConversations] = useLocalStorage('conversations', []);
	const { contacts } = useContext(ContactsContext);
	const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
	const { socket } = useContext(SocketContext);

	const createConversation = (recipients) => {
		setConversations(prev => [...prev, { recipients, messages: [] }]);
	}

	console.log('c', conversations)

	const formattedConversations = conversations.map((conversation, i) => {
		const recipients = conversation.recipients.map(recipient => {
			const contact = contacts.find(c => recipient === c.id);
			const name = (contact && contact.name) || recipient;

			return { id: recipient, name }
		});

		const selected = i === selectedConversationIndex;

		const messages = conversation.messages.map(message => {
			const contact = contacts.find(c => message.sender === c.id);
			const name = (contact && contact.name) || message.sender;
			const fromMe = id === message.sender;

			return { ...message, senderName: name, fromMe }
		});

		return { ...conversation, recipients, selected, messages }
	});

	const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
		setConversations(prev => {
			let madeChange = false;
			const newMessage = { sender, text };
			const newConversations = prev.map(conversation => {
				if (arrayEquality(conversation.recipients, recipients)) {
					madeChange = true;
					return { ...conversation, messages: [...conversation.messages, newMessage] }
				}

				return conversation;
			});


			if (madeChange) {
				return newConversations;
			} else {
				return [...prev, { recipients, messages: [newMessage] }]
			}
		});
	}, []);

	const sendMessage = (recipients, text) => {
		socket.emit('send-message', { recipients, text });
		addMessageToConversation({ recipients, text, sender: id });
	}

	useEffect(() => {
		if (!socket) {
			return;
		}

		socket.on('receive-message', addMessageToConversation)
		return () => socket.off('receive-message', addMessageToConversation);
	}, [socket, addMessageToConversation]);

	return (
		<ConversationsContext.Provider value={{
			conversations: formattedConversations,
			createConversation,
			selectConversationIndex: setSelectedConversationIndex,
			selectedConversation: formattedConversations[selectedConversationIndex],
			sendMessage,
		}}>
			{children}
		</ConversationsContext.Provider>
	);
}
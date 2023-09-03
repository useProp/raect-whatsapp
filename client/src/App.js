import React from 'react';
import Login from './components/Login';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from './contexts/ContactsContext';
import { ConversationsProvider } from './contexts/ConversationsContext';
import SocketProvider from './contexts/SocketProvider';

const App = () => {
	const [id, setId] = useLocalStorage('id', null);

	const dashboard = (
		<SocketProvider id={id}>
			<ContactsProvider>
				<ConversationsProvider id={id}>
					<Dashboard id={id} />
				</ConversationsProvider>
			</ContactsProvider>
		</SocketProvider>
	);

	return (
		<>
			{ id ? dashboard : <Login onIdSubmit={setId} /> }
		</>
	);
};

export default App;
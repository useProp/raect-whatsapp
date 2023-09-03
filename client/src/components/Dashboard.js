import React, { useContext } from 'react';
import Sidebar from './Sidebard';
import ActiveConversation from './ActiveConversation';
import { ConversationsContext } from '../contexts/ConversationsContext';

const Dashboard = ({ id }) => {
	const { conversations } = useContext(ConversationsContext);

	return (
		<div style={{ height: '100vh' }} className={'d-flex'}>
			<Sidebar id={id} />
			{!!conversations.length && <ActiveConversation/>}
		</div>
	);
};

export default Dashboard;
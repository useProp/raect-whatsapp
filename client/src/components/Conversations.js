import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ConversationsContext } from '../contexts/ConversationsContext';

const Conversations = () => {
	const { conversations, selectConversationIndex } = useContext(ConversationsContext);

	return (
		<ListGroup variant={'flush'}>
			{conversations.map((c, i) => (
				<ListGroup.Item
					key={i}
					action
					active={c.selected}
					onClick={() => selectConversationIndex(i)}
				>
					{c.recipients.map(r => r.name).join(', ')}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default Conversations;
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ContactsContext } from '../contexts/ContactsContext';
import { ConversationsContext } from '../contexts/ConversationsContext';

const NewConversationModal = ({ closeModal }) => {
	const { contacts } = useContext(ContactsContext)
	const { createConversation } = useContext(ConversationsContext)
	const [selectedContactsIds, setSelectedContactsIds] = useState([]);

	const handleCheckboxChange = (id) => {
		setSelectedContactsIds(prev => {
			if (prev.includes(id)) {
				return prev.filter(i => i !== id);
			}
			return [...prev, id];
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		createConversation(selectedContactsIds);
		closeModal();
	}

	return (
		<>
			<Modal.Header closeButton>Create Conversation</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{contacts.map(c => (
						<Form.Group controlId={c.id} key={c.id}>
							<Form.Check
								value={selectedContactsIds.includes(c.id)}
								label={c.name}
								onChange={() => handleCheckboxChange(c.id)}
							/>
						</Form.Group>
					))}
					<Button type={'submit'} className={'mt-2'}>Create</Button>
				</Form>
			</Modal.Body>
		</>
	);
};

export default NewConversationModal;
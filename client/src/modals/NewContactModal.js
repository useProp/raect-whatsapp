import React, { useContext, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ContactsContext } from '../contexts/ContactsContext';

const NewContactModal = ({ closeModal }) => {
	const idRef = useRef();
	const nameRef = useRef();
	const { contacts, createContact } = useContext(ContactsContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		createContact(idRef.current.value, nameRef.current.value);
		closeModal();
	}

	return (
		<>
			<Modal.Header closeButton>Create Contact</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>ID</Form.Label>
						<Form.Control required ref={idRef} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control required ref={nameRef} />
					</Form.Group>
					<Button type={'submit'} className={'mt-2'}>Create</Button>
				</Form>
			</Modal.Body>
		</>
	);
};

export default NewContactModal;
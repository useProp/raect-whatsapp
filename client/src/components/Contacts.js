import React, { useContext } from 'react';
import { ContactsContext } from '../contexts/ContactsContext';
import { ListGroup } from 'react-bootstrap';

const Contacts = () => {
	const { contacts } = useContext(ContactsContext);

	return (
		<ListGroup variant={'flush'}>
			{contacts.map(c => (
				<ListGroup.Item key={c.id}>
					{c.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default Contacts;
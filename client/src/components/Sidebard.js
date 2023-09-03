import React, { useState } from 'react';
import { Button, Modal, Nav, Tab } from 'react-bootstrap';
import Contacts from './Contacts';
import Conversations from './Conversations';
import NewConversationModal from '../modals/NewConversationModal';
import NewContactModal from '../modals/NewContactModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

const Sidebar = ({ id }) => {
	const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
	const [modalOpen, setModalOpen] = useState(false);
	const isConversationOpen = activeKey === CONVERSATIONS_KEY;

	const closeModal = () => {
		setModalOpen(false);
	}

	return (
		<div style={{ width: '250px' }} className={'d-flex flex-column'}>
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				<Nav variant={'tabs'} className={'justify-content-center'}>
					<Nav.Item>
						<Nav.Link eventKey={CONVERSATIONS_KEY}>
							Conversations
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey={CONTACTS_KEY}>
							Contacts
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content className={'border-end flex-grow-1 overflow-auto'}>
					<Tab.Pane eventKey={CONVERSATIONS_KEY}>
						<Conversations />
					</Tab.Pane>
					<Tab.Pane eventKey={CONTACTS_KEY}>
						<Contacts />
					</Tab.Pane>
				</Tab.Content>
				<div className={'border-top border-end p-2 small'}>
					Your ID: <span className={'text-muted'}>{ id }</span>
				</div>
			</Tab.Container>

			<Button className={'rounded-0'} onClick={() => setModalOpen(true)}>
				New {isConversationOpen ? 'Conversation' : 'Contact'}
			</Button>

			<Modal show={modalOpen} onHide={closeModal}>
				{ isConversationOpen
					?
					<NewConversationModal  closeModal={closeModal} />
					:
					<NewContactModal  closeModal={closeModal} /> }
			</Modal>
		</div>
	);
};

export default Sidebar;
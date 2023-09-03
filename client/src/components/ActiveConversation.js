import React, { useCallback, useContext, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ConversationsContext } from '../contexts/ConversationsContext';

const ActiveConversation = () => {
	const [text, setText] = useState('');
	const { sendMessage, selectedConversation } = useContext(ConversationsContext);
	const setRef = useCallback(node => {
		if (node) {
			node.scrollIntoView({ behavior: 'smooth' })
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		sendMessage(
			selectedConversation.recipients.map(r => r.id),
			text
		);

		setText('');
	}

	return (
		<div className={'d-flex flex-column flex-grow-1'}>
			<div className={'flex-grow-1 overflow-y-auto'}>
				<div className={'d-flex flex-column align-items-start justify-content-end px-3'}>
					{selectedConversation.messages.map((message, i) => {
						const isLastMessage = selectedConversation.messages.length - 1 === i;
						return (
							<div
								ref={isLastMessage ? setRef : null}
								key={i}
								className={`d-flex my-1 flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
							>
								<div
									className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
								>
									{message.text}
								</div>
								<div
									className={`text-muted small ${message.fromMe && 'text-end'}`}
								>
									{message.fromMe ? 'You' : message.sender}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className={'m-2'}>
					<InputGroup>
						<Form.Control
							as={'textarea'}
							required
							value={text}
							onChange={e => setText(e.target.value)}
							style={{ height: '75px', resize: 'none', }}
						/>
						<Button type={'submit'}>Send</Button>
					</InputGroup>
				</Form.Group>

			</Form>
		</div>
	);
};

export default ActiveConversation;
import React, { useRef } from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { v4 } from 'uuid';

const Login = ({ onIdSubmit }) => {
	const idRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(idRef.current.value)
		onIdSubmit(idRef.current.value);
	}

	const createNewId = () => {
		onIdSubmit(v4());
	}


	return (
		<Container className={'align-items-center d-flex'} style={{ height: '100vh' }}>
			<Form className={'w-100'} onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Enter Your ID</Form.Label>
					<Form.Control ref={idRef} required />
				</Form.Group>
				<Stack direction={'horizontal'} className={'mt-2'}>
					<Button type={'submit'} className={'me-2'}>Login</Button>
					<Button variant={'secondary'} onClick={createNewId}>Create A New ID</Button>
				</Stack>
			</Form>
		</Container>
	);
};

export default Login;
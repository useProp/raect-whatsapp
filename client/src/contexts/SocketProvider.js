import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ id, children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io('http://localhost:5000',{ query: { id } });
		setSocket(newSocket);
		return () => newSocket.close();
	}, [id]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
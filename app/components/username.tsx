
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({
  username: 'guest',
  setUsername: (username: string) => { },
});

export default function currentUser({ children }: { children: any }): JSX.Element {
  const [username, setUsername] = useState('guest');

  useEffect(() => {
    async function fetchUsername() {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Error retrieving username:", error);
      }
    }

    fetchUsername();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const activeUser = () => useContext(UserContext);
import React, {useReducer, useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './src/routes/auth/AuthRoutes';
import {AuthContext} from './src/utils/AuthContext';
import MainRoutes from './src/routes/main/MainRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './src/screens/authscreens/Splash';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  let initialState = {
    isLoading: true,
    userToken: null,
  };

  //  AuthReducer
  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.userToken,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userToken: null,
        };
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.userToken,
        };
    }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Auth Memo
  const authContext = useMemo(() => ({
    login: async userToken => {
      try {
        await AsyncStorage.setItem('userToken', userToken);
        dispatch({type: 'LOGIN', userToken});
      } catch (err) {
        console.log('log-----err', err);
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        dispatch({type: 'LOGOUT'});
      } catch (err) {
        console.log('-------App.js-------error:', err);
      }
    },
  }));

  // Retrieve Token
  useEffect(() => {
    const retrieve_Token = async () => {
      const userToken = await AsyncStorage.getItem('userData');
      dispatch({
        type: 'RETRIEVE_TOKEN',
        userToken: userToken ? JSON.parse(userToken) : null,
      });
    };
    setTimeout(() => {
      retrieve_Token();
    }, 2000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.isLoading ? (
          <Splash />
        ) : authState.userToken == null ? (
          <AuthRoutes />
        ) : (
          <MainRoutes />
        )}
      </NavigationContainer>
      <FlashMessage position="top" />
    </AuthContext.Provider>
  );
};

export default App;

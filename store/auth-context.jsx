import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
	token: "",
  user_id: "",
  nickname: "",
  name:"",
  phone:"",
  email:"",
  school:"",
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {},
});

const AuthContextProvider = ({children}) => {
  const [authToken, setAuthToken] = useState();
  const [authUser_id, setAuthUser_id] = useState();
  const [authNickname, setAuthNickname] = useState();
  const [authName, setAuthName] = useState();
  const [authPhone, setAuthPhone] = useState();
  const [authEmail, setAuthEmail] = useState();
  const [authSchool, setAuthSchool] = useState();

  // const [nickname, setNickname] = useState();
  // const [name, setName] = useState();
  // const [phone, setPhone] = useState();
  // const [email, setEmail] = useState();
  // const [school, setSchool] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      
      if (storedToken) {
        setAuthToken(storedToken);
      }
    }
    fetchToken();
  },[]);

  const authenticate = (data) => {
    setAuthToken(data.jwt);
    setAuthUser_id(data.user_id);
    setAuthNickname(data.nickname);
    setAuthName(data.name);
    setAuthPhone(data.phone);
    setAuthEmail(data.email);
    setAuthSchool(data.school);
    AsyncStorage.setItem('token', data.jwt);
    AsyncStorage.setItem('user_id', data.user_id);
    AsyncStorage.setItem('nickname', data.nickname);
    AsyncStorage.setItem('name', data.name);
    AsyncStorage.setItem('phone', data.phone);
    AsyncStorage.setItem('email', data.email);
    AsyncStorage.setItem('school', data.school);
  }

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user_id');
    AsyncStorage.removeItem('nickname');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('phone');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('school');
  }

  const value = {
    token: authToken,
    user_id: authUser_id,
    nickname: authNickname,
    name: authName,
    phone: authPhone,
    email: authEmail,
    school: authSchool,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

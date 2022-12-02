import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";

export const SearchListContext = createContext({
  recentSearchesSchool: [],
  add: () => {},
  remove: () => {},
});

const SearchListContextProvider = ({children}) => {
  const [list, setList] = useState();

  const add = (data) =>{
    setList((prev) => [data, ...prev]);
  }
  
  const remove = (data) => {
    setList((prev) => prev.filter((item) => item !== data));
  }

  const value = {
    list : list,
    add: add,
    remove : remove,
  }
  
  return <SearchListContextProvider.Provider value={value}>{children}</SearchListContextProvider.Provider>
}

export default SearchListContextProvider;
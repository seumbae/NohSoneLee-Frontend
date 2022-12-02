import { createContext, useState } from "react";

export const SearchListContext = createContext({
  recentSearchesSchool: [],
  add: () => {},
  remove: () => {},
});

const SearchListContextProvider = ({children}) => {
  const [list, setList] = useState([]);

  const add = (data) =>{
    setList((prev) => [...prev, data]);
  }
  
  const remove = (data) => {
    setList((prev) => prev.filter((item) => item !== data));
  }

  const value = {
    recentSearchesSchool : list,
    add: add,
    remove : remove,
  }
  
  return <SearchListContext.Provider value={value}>{children}</SearchListContext.Provider>;
}

export default SearchListContextProvider;
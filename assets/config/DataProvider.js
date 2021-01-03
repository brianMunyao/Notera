import React, {createContext, useState} from 'react';

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(false);

  return (
    <DataContext.Provider value={{authToken}}>{children}</DataContext.Provider>
  );
};

export {DataContext, DataProvider};

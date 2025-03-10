'use client';

import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [nameSearch, setNameSearch] = useState('all');
    const [enteredSearch, setEnterSearch] = useState(true);

    return (
        <SearchContext.Provider value={{ nameSearch, setNameSearch, enteredSearch, setEnterSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);

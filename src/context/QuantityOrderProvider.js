'use client';

import React, { createContext, useContext, useState } from 'react';

const QuantityOrderContext = createContext();

export const QuantityOrderProvider = ({ children }) => {
    const [orderQuantity, setOrderQuantity] = useState(0);

    return (
        <QuantityOrderContext.Provider value={{ orderQuantity, setOrderQuantity }}>
            {children}
        </QuantityOrderContext.Provider>
    );
};

export const useQuantityOrder = () => useContext(QuantityOrderContext);

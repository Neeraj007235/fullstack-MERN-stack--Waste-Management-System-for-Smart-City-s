import React, { createContext, useContext, useState } from "react";

//1st step 
export const BioContext = createContext();

//2nd step 
export const BioProvider = ({ children }) => {
    const initialBioDriver = localStorage.getItem("Drivers");
    const [BioDriver, setBioDriver] = useState(
        initialBioDriver ? JSON.parse(initialBioDriver) : undefined
    );
    return (
        <BioContext.Provider value={[BioDriver, setBioDriver]}>
            {children}
        </BioContext.Provider>
    )
}

//3rd step
export const useBio = () => useContext(BioContext);

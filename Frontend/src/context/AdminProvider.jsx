import React, { createContext, useContext, useState } from "react";

//1st step 
export const AdminContext = createContext();

//2nd step 
export const AdminProvider = ({ children }) => {
    const initialAdmin = localStorage.getItem("Admin");
    const [Admin, setAdmin] = useState(
        initialAdmin ? JSON.parse(initialAdmin) : undefined
    );
    return (
        <AdminContext.Provider value={[Admin, setAdmin]}>
            {children}
        </AdminContext.Provider>
    )
}
 //3rd step
export const useAdmin = () => useContext(AdminContext);

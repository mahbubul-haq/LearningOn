import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminState = (props) => {
    const [admin, setAdmin] = useState(localStorage.getItem("admin"));
    
  return (
    <AdminContext.Provider value={{}}>{props.children}</AdminContext.Provider>
  );
};

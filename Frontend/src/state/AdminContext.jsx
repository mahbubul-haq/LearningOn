import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminState = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (adminToken) localStorage.setItem("adminToken", adminToken);
    else localStorage.removeItem("adminToken");
  }, [adminToken]);

  const login = async (e) => {
    e.preventDefault();
    //console.log("admin login");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            username: username,
          }),
        }
      );

      const data = await res.json();

     // console.log(data);

      if (data.success) {
        setAdminToken(data.token);
      }
    } catch (err) {
      //
    }
  };

  const verifyAdmin = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/verify`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": adminToken,
          },
        }
      );

      let data = await res.json();
     // console.log(data);
      if (!data.success) {
        setAdminToken(null);
      }
    } catch (error) {
      setAdminToken(null)
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminToken,
        setAdminToken,
        verifyAdmin,
        login,
        username,
        setUsername,
        password,
        setPassword
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

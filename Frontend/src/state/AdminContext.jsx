import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminState = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adminToken) localStorage.setItem("adminToken", adminToken);
    else localStorage.removeItem("adminToken");
  }, [adminToken]);

  useEffect(() => {
    if (loading && query === "unpublished-courses") {
      getUnpublishedCourses();
    }
  }, [loading, query]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      setAdminToken(null);
    }
  };

  const getUnpublishedCourses = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/unpublished`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": adminToken,
          },
        }
      );

      let data = await res.json();

      if (data.success) {
        setData(data.courses);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
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
        setPassword,
        data,
        setData,
        getUnpublishedCourses,
        query,
        setQuery,
        loading,
        setLoading
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

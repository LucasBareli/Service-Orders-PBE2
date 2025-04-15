import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

export default function Logout() {
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    };

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      <IoLogOutOutline size={20} />
    </button>
  );
}

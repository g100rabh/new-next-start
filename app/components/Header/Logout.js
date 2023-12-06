"use client";
import "../../../styles/global.css";
const { signOut } = require("next-auth/react");

const Logout = () => {
  return (
    <button className="bg-red-500 px-3 py-1 rounded-sm" onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default Logout;

"use client"; // This marks this file as a client-side component

import dynamic from "next/dynamic";

// Dynamically import Navbar with ssr: false
const Navbar = dynamic(() => import("./navbar"), { ssr: false });

const ClientOnlyNavbar = () => {
  return <Navbar />;
};

export default ClientOnlyNavbar;

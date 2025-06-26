"use client"; // Marks this as a Client Component

import { signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut();
    redirect("/sign-in");
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-primary-100 bg-dark-500 px-4 py-2 rounded hover:bg-dark-700 transition font-bold cursor-pointer text-2xl"
    >
      Sign Out
    </button>
  );
}
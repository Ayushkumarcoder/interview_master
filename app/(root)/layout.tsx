// import { isAuthenticated } from '@/lib/actions/auth.action'
// import Link from 'next/link'
// import { redirect } from 'next/navigation';
// import React, { ReactNode } from 'react'

// const RootLayout = async({children}: {children: ReactNode}) => {

//   //checing if user is authenticated or not
//   const isUserAuthenticated = await isAuthenticated();

//   if(!isUserAuthenticated) {
//     redirect('/sign-in');
//   }

//   return (
//     <div className='root-layout'>
//         <nav>
//             <Link href='/' className='flex items-center gap-4'>
//                 <img src='/logo.svg' alt='logo' width={38} height={32}/>
//                 <h2 className='text-primary-100'>PrepPal</h2>
//             </Link>
            
//         </nav>
//         {children}
//     </div>
//   )
// }

// export default RootLayout




import { isAuthenticated } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import SignOutButton from "@/components/SignOut"; // Import the new component

const RootLayout = async ({ children }: { children: ReactNode }) => {
  // Checking if user is authenticated or not
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between ">
        <Link href="/" className="flex items-center gap-4">
          <img src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepPal</h2>
        </Link>
        <SignOutButton /> {/* Use the Client Component here */}
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
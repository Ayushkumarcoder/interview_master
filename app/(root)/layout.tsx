import Link from 'next/link'
import React, { ReactNode } from 'react'

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='root-layout'>
        <nav>
            <Link href='/' className='flex items-center gap-4'>
                <img src='/logo.svg' alt='logo' width={38} height={32}/>
                <h2 className='text-primary-100'>PrepPal</h2>
            </Link>
        </nav>
        {children}
    </div>
  )
}

export default RootLayout
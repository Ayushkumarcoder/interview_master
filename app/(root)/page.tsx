import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 mx-w-lg'>
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className='text-lg'>Practice on real interview questions & get instant feedback</p>

          <Button  asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Start an Interview</Link>

          </Button>
        </div>

        <img src='/robot.png' alt='robo-img' width={400} height={400} className='max-sm:hidden'></img>

      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          <p>You haven't taken any interviews yet</p>

        </div>

      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          <p>There are no interviews available</p>

        </div>

      </section>
    </>
  )
}

export default page
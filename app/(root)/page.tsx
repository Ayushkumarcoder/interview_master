import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/auth.action'
import Link from 'next/link'
import React from 'react'

const page = async() => {

  const user = await getCurrentUser();
  console.log("Current User:", user);

  //this is one way to fetch both the data
  // const userInterviews = await getInterviewsByUserId(user?.id!);
  // const latestInterview = await getLatestInterviews({ userId: user?.id! });

  // a more faster way to fetch both simultaneously
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);




  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

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
          {/* <p>You haven't taken any interviews yet</p> */}

          {
            !user?.id ? (
              <>
                {console.error("User ID is undefined")}
                <h1>Error: User not found</h1>
              </>
            ) : 

            hasPastInterviews ? (
              userInterviews?.map((interview) => (<InterviewCard {... interview} key={interview.id}></InterviewCard>)))
            : (
              <p>You haven't taken any interviews yet</p>
            )
          }

          

        </div>

      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {/* <p>There are no interviews available</p> */}

          {
            hasUpcomingInterviews ? (
              latestInterviews?.map((interview) => (<InterviewCard {... interview} key={interview.id}></InterviewCard>))
            ) : (
              <p>There is no new interviews available</p>
            )
          }


        </div>

      </section>
    </>
  )
}

export default page
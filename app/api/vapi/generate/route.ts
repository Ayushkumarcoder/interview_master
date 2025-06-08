import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
//this file interacts with vapi to get the information and then pass it on to the gemini
//it is an api which interacts as middleware between vapi and gemini

export async function GET() {
  return Response.json(
    { success: true, message: "This is the generate route for vapi." },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
        role, type, level,
        techstack: techstack,
        questions: JSON.parse(questions),
        userId: userid,
        finalized: true,
        coverImage: getRandomInterviewCover(),
        createdAt: new Date().toISOString(),
    }

    await db.collection("interviews").add(interview);
    
    return Response.json({success: true, message: "Interview questions generated successfully", questions: JSON.parse(questions) }, { status: 200 });


  } catch (error: any) {
    console.error("Error in POST /vapi/generate:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

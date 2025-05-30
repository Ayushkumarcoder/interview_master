"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import {
  Form,
  
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8), 
    })
}

const AuthForm = ({type}: {type: FormType}) => {
    //calling the authFormSchema function to get the schema
    const formSchema = authFormSchema(type);

    const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if(type === "sign-up") {
            // Sign up logic
            toast.success("Account created successfully!  Please Login");
            router.push("/sign-in");
        }else{
            // Sign in logic
            toast.success("Signed in successfully!");
            router.push("/");
        }
        
    } catch (error) {
        // Handle error
        console.error("Error submitting form", error);
        toast.error(`Error submitting form: ${error}`);
        
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38}></Image>
          <h2 className="text-primary-100">PrepPal</h2>
          
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIn && (<FormField 
            control={form.control}
             name="name"
              label="Name"
               placeholder="Enter your name"
                type="text"

            />)}
            <FormField 
            control={form.control}
             name="email"
              label="Email"
               placeholder="Enter your email address"
                type="email"

            />
            <FormField 
            control={form.control}
             name="password"
              label="Password"
               placeholder="Enter your password"
                type="password"

            />
            
            <Button className="btn" type="submit">{isSignIn ? 'Sign In ' : 'Create an Account' }</Button>
          </form>
        
        </Form>

        <p className="text-center">
            {isSignIn ? 'No accout yet?  ': 'Already have an account?  '}
            <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSignIn ? ' Sign In ' : ' Sign Up '}</Link>
        </p>

      </div>
    </div>
  );
};

export default AuthForm;

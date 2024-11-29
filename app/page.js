'use client';

// import { UserButton } from "@clerk/nextjs";
import Dashboard from "@/app/dashboard/page";
import CategoryList from "./_components/CategoryList";

export default function Home() {
  return (
    <div className="">
      <h1>Hello , World!</h1>

      {/*  <UserButton /> */}

      <Dashboard /> 
       <CategoryList /> 
    </div>
  );
}
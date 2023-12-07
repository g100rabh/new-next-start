import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Header from "../components/Header/Header";
import LoginForm from "../authentication/LoginForm";


export default async function SignIn() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <LoginForm />
    </>
  )
};
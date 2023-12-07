import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Header from "../components/Header/Header";
import RegisterForm from "../authentication/RegisterForm";

export default async function Register() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <RegisterForm />
    </>
  );
}

import { getServerSession } from "next-auth";
import AuthForm from "./AuthForm";
import { redirect } from "next/navigation";
import Header from "../components/Header/Header";

export default async function AuthPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <AuthForm />
    </>
  );
}

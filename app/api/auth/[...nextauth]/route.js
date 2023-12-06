import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password
          );

          console.log("Password correct:", passwordCorrect);

          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email,
            };
          }
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };


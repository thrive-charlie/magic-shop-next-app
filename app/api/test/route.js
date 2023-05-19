import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email Address", type: "text", placeholder: "email@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {

          const res = await fetch("/api/auth/user", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
  
          if (response.status === 200) {
            // The user is authenticated
            const data = await response.json();
            return data.accessToken;
          } else {
            // The user is not authenticated
            throw new Error("Invalid credentials");
          }

        },
        async session({ session }) {
          console.log('Something is supposed to happen here');
        }
      })

  ],
});

export { handler as GET, handler as POST };
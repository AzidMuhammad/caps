// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { connectToDatabase } from '@/lib/db';

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { db } = await connectToDatabase();

//         if (!credentials) {
//           throw new Error("No credentials provided");
//         }

//         const { email, password } = credentials;

//         const user = await db.collection('users').findOne({ email });

//         if (user && user.password === password) {
//           return {
//             id: user._id.toString(),
//             name: user.username,
//             email: user.email || `${user.username}@gmail.com`,
//             role: user.role,
//           };
//         }

//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth"
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    })
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account?.provider === 'naver') {
        token.provider = 'naver';
        token.sub = profile?.sub
        
      } else if (account?.provider === 'kakao') {
        token.provider = 'kakao';
        token.sub = profile?.sub
      }
      return token
    },
    async session({ session, token, user }) {
      session.user = token
      session.user.name = token.sub
      return session
    }, 
  }
}


export default NextAuth(authOptions)
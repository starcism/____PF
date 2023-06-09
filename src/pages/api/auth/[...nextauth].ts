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
    async jwt({ token, user, account, profile}) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account?.provider === 'naver') {
        token.provider = 'naver'
        token.sub = (profile as any)?.response?.id

      } else if (account?.provider === 'kakao') {
        token.provider = 'kakao'
        token.sub = (profile as any)?.id
        const a = await sendTokenSub(token.email, token.sub)
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token
      
      return session
    },
  }
}

export default NextAuth(authOptions)

// token.sub 값을 POST 요청으로 보내는 함수
async function sendTokenSub(email:any, sub:any) {
  const url = 'http://3.144.135.69/v1/api/auth/kakao'; // 요청을 보낼 주소
  const data = {
    email: email, // 이메일 정보
    sub: sub // token.sub 값
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const data2 = await response.json()

    console.log("response: ", data2)
  } catch (error) {
    console.error('POST 요청 중 오류 발생:', error);
  }
}

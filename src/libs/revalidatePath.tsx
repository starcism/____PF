// import axios from 'axios'
// import checkEnvironment from './checkEnvironment'

// export async function revalidatePath(path: string) {
//   // const basePath = process.env.NEXT_PUBLIC_APP_URL;
//   // const secret = process.env.NEXT_PUBLIC_APP_REVALIDATION_SECRET;
//   // if (!basePath) return null;

//   try {
//     const res = await axios.get(checkEnvironment().concat('/api/revalidate'), {
//       params: {
//         path: path,
//       },
//     })
//     console.log('res:', res)
//     return res.data
//   } catch (error) {
//     console.log(error)
//   }
//   return null
// }

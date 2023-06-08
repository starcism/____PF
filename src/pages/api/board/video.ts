import { IVideoPost } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<IVideoPost>) {
  const { page = '1', pageSize = '20', hot = '10' } = req.query;

  const data: IVideoPost = {
    list: [
      {
        boardid: 6,
        category: 'video',
        youtubeUrl: "https://youtu.be/SxHmoifp0oQ",
        title: "STAYC 'Teddy Bear' MV",
        view: 1,
        createdAt: '2023-06-07T13:37:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 4,
        commentCount: 0,
      },
      {
        boardid: 5,
        category: 'video',
        youtubeUrl: "https://youtu.be/juQvizeZJFM",
        title: "STAYC 'BEAUTIFUL MONSTER' MV",
        view: 10,
        createdAt: '2023-06-06T13:15:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 0,
        commentCount: 1,
      },
      {
        boardid: 4,
        category: 'video',
        youtubeUrl: "https://youtu.be/grG41kS4MUA",
        title: "STAYC 'RUN2U' MV",
        view: 20,
        createdAt: '2023-06-05T11:21:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: '귀여워용',
        },
        likeCount: 3,
        commentCount: 1,
      },
      {
        boardid: 3,
        category: 'video',
        youtubeUrl: "https://youtu.be/Xmxcnf2v_gs",
        title: "STAYC '색안경' MV",
        view: 30,
        createdAt: '2023-06-05T10:16:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: '성민',
        },
        likeCount: 0,
        commentCount: 0,
      },
      {
        boardid: 2,
        category: 'video',
        youtubeUrl: "https://youtu.be/_X3r09dgbQg",
        title: "STAYC 'ASAP' MV",
        view: 101,
        createdAt: '2023-06-04T01:23:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: '신진웅',
        },
        likeCount: 3,
        commentCount: 2,
      },
      {
        boardid: 1,
        category: 'video',
        youtubeUrl: "https://youtu.be/gMe1c4UegBY",
        title: "STAYC 'SO BAD' MV",
        view: 10000,
        createdAt: '2023-06-03T19:43:18.576Z',
        user: {
          userid: 1,
          profile_image: 'https://avatars.githubusercontent.com/u/76847245?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 100,
        commentCount: 1,
      },
    ],
    listTotalPage: 1,
    listTotalCount: 6,
  };

  res.status(200).json(data);
}

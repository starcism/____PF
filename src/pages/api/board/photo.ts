import { IPhotoPost } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<IPhotoPost>) {
  const { page = '1', pageSize = '20', hot = '10' } = req.query;

  const data: IPhotoPost = {
    list: [
      {
        boardid: 6,
        category: 'photo',
        images: ['/images/isa8.jpeg', '/images/isa9.jpeg', '/images/seun13.jpeg', '/images/seun14.jpeg'],
        title: "#아이사",
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
        category: 'photo',
        images: ['/images/isa6.jpeg', '/images/isa7.jpeg', '/images/seun11.jpeg', '/images/seun12.jpeg'],
        title: "#아이사 #세은",
        view: 10,
        createdAt: '2023-06-05T13:15:42.123Z',
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
        category: 'photo',
        images: ['/images/seun5.jpeg', '/images/seun6.jpeg', '/images/seun7.jpeg', '/images/seun8.jpeg', '/images/seun9.jpeg', '/images/seun10.jpeg'],
        title: "#세은",
        view: 20,
        createdAt: '2023-06-04T11:21:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 3,
        commentCount: 1,
      },
      {
        boardid: 3,
        category: 'photo',
        images: ['/images/seun1.jpeg', '/images/seun2.jpeg', '/images/seun16.jpeg', '/images/seun4.jpeg'],
        title: "#세은",
        view: 30,
        createdAt: '2023-06-04T10:16:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: '깅이',
        },
        likeCount: 0,
        commentCount: 0,
      },
      {
        boardid: 2,
        category: 'photo',
        images: ['/images/isa3.jpeg', '/images/isa4.jpeg', '/images/isa5.jpeg'],
        title: "#아이사",
        view: 101,
        createdAt: '2023-06-02T01:23:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: '챙냥이',
        },
        likeCount: 3,
        commentCount: 2,
      },
      {
        boardid: 1,
        category: 'photo',
        images: ['/images/isa1.jpeg', '/images/isa2.jpeg'],
        title: "#아이사",
        view: 430,
        createdAt: '2023-06-01T19:43:18.576Z',
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

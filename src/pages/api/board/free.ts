import { IFreePost } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<IFreePost>) {
  const { page = '1', pageSize = '20', hot = '10' } = req.query;

  const data: IFreePost = {
    list: [
      {
        boardid: 6,
        category: 'free',
        title: 'ㅎㅇㅎㅇ',
        view: 1,
        createdAt: '2023-06-07T13:37:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 0,
        commentCount: 0,
      },
      {
        boardid: 5,
        category: 'free',
        title: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄲㄲㄲㄲㄲㄲㄲㄲ',
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
        category: 'free',
        title: '4',
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
        category: 'free',
        title: 'ㅎㅇ',
        view: 30,
        createdAt: '2023-06-03T10:16:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 0,
        commentCount: 0,
      },
      {
        boardid: 2,
        category: 'free',
        title: '123123',
        view: 101,
        createdAt: '2023-06-02T01:23:42.123Z',
        user: {
          userid: 2,
          profile_image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
          nickname: 'SWITHy',
        },
        likeCount: 3,
        commentCount: 2,
      },
      {
        boardid: 1,
        category: 'free',
        title: '첫 글',
        view: 10000,
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

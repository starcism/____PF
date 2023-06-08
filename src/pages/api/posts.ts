import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { title, content } = req.body;
      // title과 content를 사용하여 원하는 작업을 수행합니다.
      // 예를 들어, 데이터베이스에 저장하거나 파일에 기록할 수 있습니다.
  
      // 데이터를 JSON 형식으로 저장
      const data = { title, content };
      const jsonData = JSON.stringify(data);
      fs.writeFileSync('data.json', jsonData);
  
      res.status(200).json({ message: 'Post saved successfully' });
    } else if (req.method === 'GET') {
      // 저장된 JSON 데이터를 읽어옴
      const jsonData = fs.readFileSync('data.json', 'utf-8');
      const data = JSON.parse(jsonData);
  
      res.status(200).json(data);
    } else {
      res.status(405).end(); // POST와 GET 이외의 다른 요청은 허용하지 않음을 응답합니다.
    }
  }
  
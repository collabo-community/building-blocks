import { Request, Response } from 'express';

export interface ApiInfo {
  name: string;
  description: string;
  built_at: string;
  github: {
    repository: string;
  };
  contributors: {
    count: number;
    list: string[];
  };
}

export const getAppController =  async (req: Request, res: Response) => {
  const apiInfo: ApiInfo = {
    name: 'Building Blocks Framework Doc',
    description: 'API for the Documentation app instances (for users) of the libraries within Building blocks framework',
    built_at: 'Collabo Community [Code Collabo]',
    github: {
      repository: 'https://github.com/collabo-community/building-blocks',
    },
    contributors: {
      count: 1, // TODO: Dynamically get the list of contributors from GitHub
      list: ['Find list of contributors in project README: https://github.com/collabo-community/building-blocks?tab=readme-ov-file#contributors'],
    },
  };
  res.status(200).json(apiInfo);
}
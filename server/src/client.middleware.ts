import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as path from 'path';
import { ROUTE_PREFIX } from './config';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) =>
  path.resolve(`../../client/dist/clien/${file}`);

@Injectable()
export class ClientMiddleware implements NestMiddleware {
  use(...args: any[]) {
    console.log('middleware hit');
    return (req: Request, res: Response, next: NextFunction) => {
      const { url } = req;
      console.log(url);
      if (url.indexOf(ROUTE_PREFIX) === 1) {
        // it starts with /api --> continue with execution
        next();
      } else if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
        // it has a file extension --> resolve the file
        res.sendFile(resolvePath(url));
      } else {
        // in all other cases, redirect to the index.html!
        res.sendFile(resolvePath('index.html'));
      }
    };
  }
}

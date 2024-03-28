import { diskStorage } from 'multer';
import * as path from 'path';
export function getFileConfig(dirName: string = 'upload') {
  return {
    storage: diskStorage({
      destination: path.join(__dirname, '../../', dirName),
      filename(req, file, callback) {
        callback(null, `${new Date().getMilliseconds()}-${file.originalname}`);
      },
    }),
  };
}

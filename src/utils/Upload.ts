import fs from 'fs';
import { RequestError } from './RequestError';

export const saveFileBaseLocally = async (
  file: string | string[],
  folder: string,
  fileName: string
): Promise<
  {
    extension: string;
    folder: string;
    fileName: string;
    order: number;
  }[]
> => {
  let filesList = file as string[];
  if (!Array.isArray(file)) {
    filesList = [file];
  }

  const path = `${process.env.PATH_IMAGES || ''}/${folder}`;
  fs.mkdirSync(path, { recursive: true });

  const files = await Promise.all(
    filesList.map((item, index) =>
      saveFile(item, folder, `${fileName}_${index + 1}`)
    )
  );

  return files.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};

export const saveFile = (
  file: string,
  folder: string,
  fileName: string
): Promise<{
  extension: string;
  folder: string;
  fileName: string;
}> => {
  const path = `${process.env.PATH_IMAGES || ''}/${folder}`;

  const regex = new RegExp(/((?<=\/).*(?=;))/g);
  const fileExtensionExtract = regex.exec(file);

  if (!fileExtensionExtract?.length) {
    throw new RequestError('Error on extract extension', 400);
  }

  const extension = fileExtensionExtract[0];
  const fileWithoutHeaders = file.replace(/^.*base64,/, '');

  return new Promise((resolve, reject) => {
    fs.writeFile(
      `${path}/${fileName}.${extension}`,
      fileWithoutHeaders,
      'base64',
      function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          extension,
          folder,
          fileName,
        });
      }
    );
  });
};

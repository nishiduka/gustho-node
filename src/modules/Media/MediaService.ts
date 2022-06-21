import { slugify } from 'utils/Slughfy';
import { saveFileBaseLocally } from 'utils/Upload';
import MediaDTO from './MediaDTO';
import { IMedia } from './TMedia';

export const saveMedia = async (
  files: string | string[],
  filename: string,
  folder: string,
  productId: number
) => {
  let filesToInsert = [] as string[];
  if (Array.isArray(files)) {
    filesToInsert = files;
  }

  const filesSaved = await saveFileBaseLocally(
    filesToInsert,
    folder,
    slugify(filename)
  );

  const path = process.env.PATH_IMAGES_PUBLIC || '';

  const bulk = [] as IMedia[];
  for (let index = 0; index < filesSaved.length; index++) {
    const item = filesSaved[index];
    const pathPublic = `${path}/${item.folder}`;

    bulk.push({
      filename,
      order: item.order.toString(),
      path: `${pathPublic}/${item.fileName}.${item.extension}`,
      extension: item.extension,
      productId,
    });
  }

  await MediaDTO.bulkCreate(bulk);
};

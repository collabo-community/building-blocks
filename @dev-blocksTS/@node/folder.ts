import { mkdirSync, readdirSync } from 'fs';

const folder = {
  create: ({ folderPath }: { folderPath: string }) => {
    mkdirSync(folderPath, { recursive: true });
    return;
  },
  content: {
        /* ---------------------------------------------------
            Returns: Array of strings
            Description: Lists the files and/or folders in the
            folder supplied
        ----------------------------------------------------*/
        list: ({ targetFolder }: { targetFolder: string }) => {
          const folderContent: string[] = readdirSync(targetFolder);
          return folderContent;
      },
        /* -----------------------------------------------------
            Returns: boolean
            Description: Confirms the existence of a single file
            or folder, inside the folder supplied
        -------------------------------------------------------*/
        exists: ({searchFolder, searchFor}: { searchFolder: string, searchFor: string }) => {
          const folderContent: string[] = folder.content.list({ targetFolder: searchFolder });
              return folderContent.some(folder => folder === searchFor);
      },
    },
};

export {
    folder,
};
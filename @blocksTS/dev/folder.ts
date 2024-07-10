import { readdirSync } from 'fs';

const folder = {
  content: {
        /* ---------------------------------------------------
            Returns: Array of strings
            Description: Lists the files and/or folders in the
            folder supplied
        ----------------------------------------------------*/
        list: ({ targetFolder }: { targetFolder: string }) => {
            try {
              const folderContent: string[] = readdirSync(targetFolder);
              return folderContent;
            } catch (err) {
              throw err;
            }
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
const { readdirSync } = require('fs');

const folder = {
    content: {
        /* ---------------------------------------------------
            Returns: Array of strings
            Description: Lists the files and/or folders in the
            folder supplied
        ----------------------------------------------------*/
        list: ({ targetFolder }) => {
            const folderContent = readdirSync(targetFolder, (err, filesAndFolders) => {
                if (err) {
                  throw err;
                }
                return filesAndFolders;
            });
            return folderContent;
        },
        /* -----------------------------------------------------
            Returns: boolean
            Description: Confirms the existence of a single file
            or folder, inside the folder supplied
        -------------------------------------------------------*/
        exists: ({ searchFolder, searchFor }) => {
            const folderContent = folder.content.list({ targetFolder: searchFolder });
            return folderContent.some(folder => folder === searchFor);
        },
    },
};

export {
    folder,
};
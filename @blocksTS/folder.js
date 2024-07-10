"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folder = void 0;
const fs_1 = require("fs");
const folder = {
    content: {
        /* ---------------------------------------------------
            Returns: Array of strings
            Description: Lists the files and/or folders in the
            folder supplied
        ----------------------------------------------------*/
        list: ({ targetFolder }) => {
            try {
                const folderContent = (0, fs_1.readdirSync)(targetFolder);
                return folderContent;
            }
            catch (err) {
                throw err;
            }
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
exports.folder = folder;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folder = void 0;
const fs_1 = require("fs");
const folder = {
    // create: ({}: {}) => {
    // },
    content: {
        /* ---------------------------------------------------
            Returns: Array of strings
            Description: Lists the files and/or folders in the
            folder supplied
        ----------------------------------------------------*/
        list: ({ targetFolder }) => {
            const folderContent = (0, fs_1.readdirSync)(targetFolder);
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
exports.folder = folder;

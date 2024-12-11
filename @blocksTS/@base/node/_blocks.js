"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._blocks = void 0;
const path_1 = require("path");
// TODO: Add comment about what the methods do/return returns...
const _blocks = {
    lib: {
        root: {
            fromThisBaseFilePosition: '../../../',
        },
        path: {
            fromRoot: ({ targetFolder }) => {
                return `${_blocks.lib.root.fromThisBaseFilePosition}${targetFolder}`;
            },
            resolve: ({ targetFolder }) => {
                targetFolder = _blocks.lib.path.fromRoot({ targetFolder });
                return (0, path_1.resolve)(__dirname, targetFolder);
            },
        },
    },
};
exports._blocks = _blocks;

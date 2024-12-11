import { resolve } from 'path';

// TODO: Add comment about what the methods do/return returns...

const _blocks = {
    lib: {
        root: {
            fromThisBaseFilePosition: '../../../',
        },
        path: {
            fromRoot: ({ targetFolder }: { targetFolder: string; }) => {
                return `${_blocks.lib.root.fromThisBaseFilePosition}${targetFolder}`;
            },
            resolve: ({ targetFolder }: { targetFolder: string; }) => {
                targetFolder = _blocks.lib.path.fromRoot({ targetFolder });
                return resolve(__dirname, targetFolder);
            },
        },
    },
};

export {
    _blocks,
};
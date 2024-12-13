declare const _blocks: {
    lib: {
        root: {
            fromThisBaseFilePosition: string;
        };
        path: {
            fromRoot: ({ targetFolder }: {
                targetFolder: string;
            }) => string;
            resolve: ({ targetFolder }: {
                targetFolder: string;
            }) => string;
        };
    };
};
export { _blocks, };

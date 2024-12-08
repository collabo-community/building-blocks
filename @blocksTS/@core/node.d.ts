declare const core: {
    npm: {
        run: ({ script, packageJsonFilePath }: {
            script: string;
            packageJsonFilePath?: string;
        }) => void;
    };
    lib: {
        path: {
            getRootFromCoreFilePosition: ({ targetFolder }: {
                targetFolder: string;
            }) => string;
            resolve: ({ targetFolder }: {
                targetFolder: string;
            }) => string;
        };
    };
    config: {
        update: {
            cli: () => Promise<void>;
        };
    };
};
export { core, };

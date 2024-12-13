declare const folder: {
    create: ({ folderPath }: {
        folderPath: string;
    }) => void;
    content: {
        list: ({ targetFolder }: {
            targetFolder: string;
        }) => string[];
        exists: ({ searchFolder, searchFor }: {
            searchFolder: string;
            searchFor: string;
        }) => boolean;
    };
};
export { folder, };

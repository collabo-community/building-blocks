declare const file: {
    create: {
        withContent: ({ filePathName, content }: {
            filePathName: string;
            content?: string;
        }) => void;
        withoutContent: ({ filePathName }: {
            filePathName: string;
        }) => void;
    };
    content: {
        add: ({ filePathName, content }: {
            filePathName: string;
            content?: string;
        }) => void;
        overwrite: ({ filePathName, content }: {
            filePathName: string;
            content?: string;
        }) => void;
    };
    exists: ({ filePathName }: {
        filePathName: string;
    }) => boolean;
};
export { file, };

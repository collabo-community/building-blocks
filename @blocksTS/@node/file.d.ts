declare const file: {
    create: {
        withContent: ({ filePathName, content, type, prependText, appendText }: {
            filePathName: string;
            content?: any;
            type: "string" | "object" | "json";
            prependText?: string;
            appendText?: string;
        }) => void;
        withoutContent: ({ filePathName }: {
            filePathName: string;
        }) => void;
    };
    content: {
        overwrite: ({ filePathName, content, type, prependText, appendText }: {
            filePathName: string;
            content?: any;
            type: "string" | "object" | "json";
            prependText?: string;
            appendText?: string;
        }) => void;
    };
    exists: ({ filePathName }: {
        filePathName: string;
    }) => boolean;
};
export { file, };

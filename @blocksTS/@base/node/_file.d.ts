declare const _file: {
    content: {
        none: ({ filePathName }: {
            filePathName: string;
        }) => void;
        write: ({ filePathName, content, type, prependText, appendText }: {
            filePathName: string;
            content?: any;
            type: "string" | "object" | "json";
            prependText?: string;
            appendText?: string;
        }) => void;
    };
};
export { _file, };

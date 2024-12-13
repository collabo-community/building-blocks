import { existsSync } from 'fs';
import { _file } from '../@base/node/_file';

const file = {
    create: {
        withContent: ({ filePathName, content, type, prependText, appendText }: { filePathName: string; content?: any; type: 'string' | 'object' | 'json'; prependText?: string; appendText?: string; }) => {
            return _file.content.write({ filePathName, content, type, prependText, appendText });
        },
        withoutContent: ({ filePathName }: { filePathName: string; }) => {
            return _file.content.none({ filePathName });
        },
    },
    content: {
        // get: async ({ resolvedPath }: { resolvedPath: string }) => {
        //     const { default: content } = await import(resolvedPath);
        //     return content;
        // },
        overwrite: ({ filePathName, content, type, prependText, appendText }: { filePathName: string; content?: any; type: 'string' | 'object' | 'json'; prependText?: string; appendText?: string; }) => {
            return _file.content.write({ filePathName, content, type, prependText, appendText });
        },
    },
    exists: ({ filePathName }: { filePathName: string; }) => {
        return existsSync(filePathName);
    },
};

export {
    file,
};

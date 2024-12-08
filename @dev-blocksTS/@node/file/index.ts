import { existsSync, writeFileSync } from 'fs';

const file = {
    create: {
        withContent: ({ filePathName, content }: { filePathName: string; content?: string; }) => {
            return file.content.add({ filePathName, content });
        },
        withoutContent: ({ filePathName }: { filePathName: string; }) => {
            return file.content.add({ filePathName });
        },
    },
    content: {
        // get: ({ test }: { test: any }) => {

        // },
        add: ({ filePathName, content }: { filePathName: string; content?: string; }) => {
            content = content ? content : '';
            writeFileSync(filePathName, content);
            return;
        },
        overwrite: ({ filePathName, content }: { filePathName: string; content?: string; }) => {
            return file.content.add({ filePathName, content });
        },
    },
    exists: ({ filePathName }: { filePathName: string; }) => {
        return existsSync(filePathName);
    }
}

export {
    file,
};
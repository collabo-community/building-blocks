import { writeFileSync } from 'fs';
import util from 'util';

const _file = {
    content: {
        none: ({ filePathName }: { filePathName: string; }) => {
            return _file.content.write({ filePathName, content: '', type: 'string' });
        },
        write: ({ filePathName, content, type, prependText, appendText }: { filePathName: string; content?: any; type: 'string' | 'object' | 'json'; prependText?: string; appendText?: string; }) => {
            if (type === 'string') {
                content = content ? content : '';
                writeFileSync(filePathName, content);
            }
            if (type === 'object') {
                content = content ? content : {};
                prependText = prependText ? prependText : '';
                appendText = appendText ? appendText : '';
                writeFileSync(filePathName, `${prependText}${util.inspect(content)}${appendText}`, 'utf-8');
            }
            // TODO: if (type === 'json') {}
            return;
        },
    },
}

export {
    _file,
};

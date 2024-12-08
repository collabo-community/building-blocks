import { spawn } from 'child_process';

const npm = {
    run: ({ script, packageJsonFilePath }: { script: string; packageJsonFilePath?: string; }) => {
        packageJsonFilePath = packageJsonFilePath ? packageJsonFilePath : './';
        const npm: string = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        spawn(npm, ['run', script], { cwd: packageJsonFilePath, stdio: 'inherit' });
    },
};

export {
    npm,
};
import { spawn } from 'child_process';

const _pkg_manager = {
    run: ({ script, packageConfigFilePath }: { script: string; packageConfigFilePath?: string; }) => {
        packageConfigFilePath = packageConfigFilePath ? packageConfigFilePath : './';
        const pkg_manager: string = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        spawn(pkg_manager, ['run', script], { cwd: packageConfigFilePath, stdio: 'inherit' });
    },
};

export {
    _pkg_manager,
};
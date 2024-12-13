import { _pkg_manager } from '../@base/node';

const pkg_manager = {
    npm: {
        run: ({ script, packageJsonFilePath }: { script: string; packageJsonFilePath?: string; }) => {
            _pkg_manager.run({ script, packageConfigFilePath: packageJsonFilePath });
        },
    },
};

const { npm } = pkg_manager;

export {
    npm,
};
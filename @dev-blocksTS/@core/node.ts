import { resolve } from 'path';
import { log } from '../@any/pretiffy';
import { npm } from '../@node/npm';
import { file } from '../@node/file';

interface Config {
    cli: {
        isDevMode: boolean;
    },
}

// TODO: Add comment about what the methods do/return returns...

const core = { //.required or .internal ?
    npm: {
        run: ({ script, packageJsonFilePath }: { script: string; packageJsonFilePath?: string; }) => npm.run({ script, packageJsonFilePath})
    },
    lib: {
        path: {
            getRootFromCoreFilePosition: ({ targetFolder }: { targetFolder: string; }) => {
                return `../../${targetFolder}`;
            },
            resolve: ({ targetFolder }: { targetFolder: string; }) => {
                targetFolder = core.lib.path.getRootFromCoreFilePosition({ targetFolder });
                return resolve(__dirname, targetFolder);
            },
        },
    },
    config: {
        update: {
            cli: async () => {
                let configSettings: Config | Record<string, never> = {};
                
                const resolvedPath = core.lib.path.resolve({ targetFolder: `config/settings.js` });
                const configFileExists = file.exists({ filePathName: resolvedPath });
                log.warning(`${configFileExists}, ${resolvedPath}`);
    
                if (configFileExists) {
                    const { default: config } = await import(resolvedPath);
                    try {
                        const isDevModeIsSet = config.cli.isDevMode === true || config.cli.isDevMode === false;
                        config.cli.isDevMode = isDevModeIsSet ? config.cli.isDevMode : true;
                        configSettings = { ...config, cli: { isDevMode: config.cli.isDevMode }};
                    } catch(err) {
                        configSettings = { ...config, cli: { isDevMode: true }};
                    }
                } else {
                    const config = {
                        cli: {
                            isDevMode: true,
                        },
                    };
                    configSettings = config;
                }
                console.log('verdict: ', configSettings);
            },
        },
    },
};

export {
    core,
};
interface Config {
    cli: {
        custom: {
            command?: boolean;
            commandUsedAtLeastOnce?: boolean;
            script: string;
        };
        isInDevMode?: boolean;
    };
}
declare const blocks: {
    framework: {
        run: ({ script, packageConfigFilePath }: {
            script: string;
            packageConfigFilePath?: string;
        }) => void;
    };
    cli: {
        package: {
            buildScript: {
                blocks: {
                    dev: string;
                    prod: string;
                };
                other: {
                    dev: string;
                    prod: string;
                };
            };
        };
        config: {
            get: ({ env }: {
                env: NodeJS.ProcessEnv;
            }) => Promise<any>;
            create: ({ content }: {
                content: Config | Record<string, never>;
            }) => void;
            update: ({ content }: {
                content: Config | Record<string, never>;
            }) => void;
            setAndRunBuildScripts: ({ env }: {
                env: NodeJS.ProcessEnv;
            }) => Promise<void>;
        };
        custom: {
            command: {
                script: {
                    full: string;
                    short: string;
                };
                get: () => string | undefined;
            };
        };
    };
};
export { blocks, };

interface Config {
    cli: {
        isDevMode: boolean;
        script: string;
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
        script: {
            dev: string;
            prod: string;
        };
        config: {
            set: ({ settings }: {
                settings: Config | Record<string, never>;
            }) => Promise<void>;
            create: ({ settings }: {
                settings: Config | Record<string, never>;
            }) => Promise<void>;
            update: ({ settings }: {
                settings: Config | Record<string, never>;
            }) => Promise<void>;
        };
    };
};
export { blocks, };

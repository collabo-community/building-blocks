declare const npm: {
    run: ({ script, packageJsonFilePath }: {
        script: string;
        packageJsonFilePath?: string;
    }) => void;
};
export { npm, };

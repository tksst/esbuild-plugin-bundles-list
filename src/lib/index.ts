import type { Plugin } from "esbuild";
import type { NormalizedPackageJson } from "read-pkg-up";
import { readPackageUp } from "read-pkg-up";

export type { NormalizedPackageJson } from "read-pkg-up";

export interface Result {
    /**
     * Path to package.json
     */
    packageJsonPath: string;
    /**
     * package.json content
     */
    packageJson: NormalizedPackageJson;
}

export interface Options {
    func: (bundled: Result[]) => void | Promise<void>;
}

const defaultOptions = {
    func: () => {},
} as const satisfies Options;

const bundlesList: (options?: Partial<Options>) => Plugin = (options = {}) => {
    const opt = {
        ...defaultOptions,
        ...options,
    };

    return {
        name: "bundles-list",
        async setup(build) {
            const thisPkg = await readPackageUp();

            const depsMap = new Map<string, NormalizedPackageJson>();

            build.onLoad({ filter: /.?/, namespace: "file" }, async ({ path: asdf }) => {
                const result = await readPackageUp({ cwd: asdf });

                if (result !== undefined && result.path !== thisPkg?.path) {
                    depsMap.set(result.path, result.packageJson);
                }

                return undefined;
            });

            build.onEnd(async () => {
                const dependencies = Array.from(depsMap.entries()).map((it) => ({
                    packageJsonPath: it[0],
                    packageJson: it[1],
                }));

                await opt.func(dependencies);
            });
        },
    };
};

export default bundlesList;

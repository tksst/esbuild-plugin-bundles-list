import bundlesList from "./index.js";

describe("plugin name", () => {
    it("default", () => {
        const x = bundlesList();
        expect(x.name).toBe("bundles-list");
    });

    it("specifies", () => {
        const pluginName = "foobar";
        const x = bundlesList({ pluginName });
        expect(x.name).toBe(pluginName);
    });
});

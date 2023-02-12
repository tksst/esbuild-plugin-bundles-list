import { pkgcmp } from "./pkgcmp.js";

describe("same name, different version", () => {
    it.each([
        ["same version", "0.0.0", "0.0.0", 0],
        ["a is larger", "0.0.4", "0.0.3", 1],
        ["b is larger(patch), numeric comparison", "0.0.9", "0.0.10", -1],
        ["b is larger(major), numeric comparison", "9.0.0", "10.0.0", -1],
    ])("%s", (dummy, a, b, expected) => {
        expect(pkgcmp({ name: "pkgname", version: a }, { name: "pkgname", version: b })).toBe(expected);
    });
});

describe("different name, same version", () => {
    it.each([
        ["same name", "a", "a", 0],
        ["a is larger", "b", "a", 1],
        ["b is larger", "a", "b", -1],
        ["b is larger (numeric string)", "10", "9", -1],
    ])("%s", (dummy, a, b, expected) => {
        expect(pkgcmp({ name: a, version: "0.0.0" }, { name: b, version: "0.0.0" })).toBe(expected);
    });
});

test("name is smaller but version is larger", () => {
    expect(pkgcmp({ name: "a", version: "10.0.0" }, { name: "b", version: "1.0.0" })).toBe(-1);
});

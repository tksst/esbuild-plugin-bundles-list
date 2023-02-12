import { compareVersions } from "compare-versions";

function strcmp(a: string, b: string): number {
    if (a === b) {
        return 0;
    }
    return a > b ? 1 : -1;
}

export function pkgcmp(a: { name: string; version: string }, b: { name: string; version: string }): number {
    const { name: an, version: av } = a;
    const { name: bn, version: bv } = b;

    if (an !== bn) {
        return strcmp(an, bn);
    }
    return compareVersions(av, bv);
}

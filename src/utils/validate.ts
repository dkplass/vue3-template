/**
 * 檢驗是否為外部路徑
 * @param path
 * @returns 是否為外部路徑
 */
export const isExternal = (path: string | URL): boolean => /^\/\//.test(path.toString());

/**
 * 檢驗是否為外部路徑
 * @param path
 * @returns 是否為外部路徑
 */
export const isExternal = (path: string | URL): boolean =>
  /^(https?:|mailto:|tel:)/.test(path.toString());

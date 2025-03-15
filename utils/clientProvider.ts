
export const prepareApiUrl = (url: string, queryParams: any): string => {
    const runtimeConfig = useRuntimeConfig();
    let result = runtimeConfig.app.businessApiUrl + url;
    if(queryParams === null || queryParams === undefined) { return result; }
    const params = new URLSearchParams(queryParams);
    return result + '?' + params.toString();
}

export const prepareUserAdminUrl = (url: string, queryParams: any): string => {
    const runtimeConfig = useRuntimeConfig();
    let result = runtimeConfig.app.userAdminUrl + url;
    if(queryParams === null || queryParams === undefined) { return result; }
    const params = new URLSearchParams(queryParams);
    return result + '?' + params.toString();
}

export const prepareHeaders = () => {
    const result = new Headers();
    // const loginStore = useLoginStore();
    // result.append("Authorization", loginStore.accessToken);
    result.append("Content-Type", "application/json");
    return result;
}

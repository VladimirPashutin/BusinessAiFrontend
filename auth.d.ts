declare module '#auth-utils' {
    export interface User {
        communities: string[] | undefined;
        roles: string[] | undefined;
        name: string | undefined;
    }

    export interface UserSession {
        jwt?: { accessToken: string;
            refreshToken: string;
        }
    }

    interface SecureSessionData {
        application: string;
    }
}

export {}

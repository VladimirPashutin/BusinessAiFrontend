declare module '#auth-utils' {
    interface User {
        communities: string[] | undefined;
        roles: string[] | undefined;
        name: string | undefined;
    }

    interface UserSession {
        jwt?: { accessToken: string;
            refreshToken: string;
        }
    }

    interface SecureSessionData {
        application: string;
    }
}

export {}

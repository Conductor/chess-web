class Config {
    public static apiUrl(): string {
        if(!__DEBUG__) {
            console.warn('Sorry, but we have API only in dev mode');
        }

        return '/api/';
    }
}

export default Config;
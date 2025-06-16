
export interface LanguageTranslationInterface {
    id: string;
    language_id: string;
    welcome: string;
    features: {
        title: string;
        description: string;
        list: {
            profile: string;
            schedule: string;
            resources: string;
            students: string;
            analytics: string;
        };
    };
    contact: {
        title: string;
        email: string;
        phone: string;
    };
    home: {
        title: string;
        subtitle: string;
        cta: string;
        description: string;
        features: {
            title: string;
            items: {
                easy: string;
                flexible: string;
                resources: string;
                community: string;
            };
        };
    };
    profile: {
        title: string;
        subtitle: string;
        sections: {
            basicInfo: {
                title: string;
                description: string;
            };
            teachingPhilosophy: {
                title: string;
                description: string;
            };
            contact: {
                title: string;
                description: string;
            };
        };
        fields: {
            name: string;
            email: string;
            phone: string;
            language: string;
            bio: string;
            save: string;
        };
    };
    languages: {
        title: string;
        subtitle: string;
        status: string;
        error: {
            updateLanguage: string;
        };
    };
    schedule: {
        title: string;
        subtitle: string;
        actions: {
            add: string;
            edit: string;
            delete: string;
        };
    };
    resources: {
        title: string;
        subtitle: string;
        types: {
            documents: string;
            videos: string;
            links: string;
            notes: string;
        };
    };
    students: {
        title: string;
        subtitle: string;
        actions: {
            add: string;
            view: string;
            progress: string;
        };
    };
    analytics: {
        title: string;
        subtitle: string;
        metrics: {
            sessions: string;
            students: string;
            resources: string;
            progress: string;
        };
    };
    common: {
        save: string;
        cancel: string;
        delete: string;
        edit: string;
        add: string;
        view: string;
        update: string;
        settings: string;
        help: string;
        logout: string;
    };
}

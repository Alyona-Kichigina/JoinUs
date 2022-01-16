export const programsBreadcrumbs = [
    {
        page: "general",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: "Общие",
                link: ""
            }
        ]
    },
    {
        page: "levels",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: "Уровни",
                link: "/"
            }
        ]
    },
    {
        page: "contacts",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: "Контакты",
                link: "/"
            }
        ]
    },
    {
        page: "documents",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: "Документы",
                link: "/"
            }
        ]
    },
    {
        page: "goals",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: "Цели",
                link: "/"
            }
        ]
    }
]

export const stagesBreadcrumbs = [
    {
        page: "general",
        config:[
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Общие",
                link: "/"
            }
        ]
    },
    {
        page: "levelStages",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Этапы",
                link: "/"
            }
        ]
    },
    {
        page: "programs",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Програмы",
                link: "/"
            }
        ]
    },
]

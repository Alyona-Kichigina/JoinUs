export const programsBreadcrumbs = [
    {
        page: "New_level",
        config: [
            {
                name: "Програмы",
                link: "programs"
            },
            {
                name: "Новый уровень",
                link: "/programs"
            }
        ]
    },
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

export const levelsBreadcrumbs = [
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
        page: "programs",
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
        page: "blocks",
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
                name: "Блоки",
                link: "/"
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
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Уровни",
                link: "/"
            }
        ]
    },
]

import type { AuthUser } from "$lib/authStore";

export class Blog {
    constructor(
        public uid: string,
        public title: string,
        public content: string,
        public created_at: string,
        public category: Category,
        public cover: string,
        public user: AuthUser,
    ) { }
}

export class Category {
    constructor(
        public uid: string,
        public slug: string,
        public desc: string,
        public created_at: string,
    ) { }
}
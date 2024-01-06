import type { AuthUser } from "$lib/authStore";
import type { Category } from "$lib/category/category";

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
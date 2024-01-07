import { AuthUser as User} from "$lib/authStore";

export class Category {
    constructor(
        public uid: string = '',
        public slug: string = '',
        public desc: string = '',
        public user = new User(),
        public created_at: string = new Date().toLocaleString(),
    ) { }
}
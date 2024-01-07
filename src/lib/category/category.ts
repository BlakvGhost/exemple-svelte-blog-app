export class Category {
    constructor(
        public uid: string = '',
        public slug: string = '',
        public desc: string = '',
        public created_at: string = new Date().toLocaleString(),
    ) { }
}
export const sanitize = (text: string): string => {
    return text.replace(/<[^>]*>/g, '').replace(/&(nbsp|#160|ensp|emsp|thinsp);/g, ' ');
};

/**
* Convertit une chaîne de caractères en un format valide pour une URL.
* 
* @param {string} title - La chaîne de caractères à convertir.
* @returns {string} La chaîne de caractères convertie.
*/
export const urlify = (title: string): string => {
    const urlifiedTitle = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s]+/g, '-')
        .toLowerCase();

    return urlifiedTitle;
};

export const reduceText = (data: string, length: number) => {
    const text = sanitize(data);
    const dots = text.length > length ? '...' : '';
    return text.slice(0, length) + dots;
};

export const scroll = (top: number = 0) => {
    window.scroll({
        top: top,
        behavior: 'smooth'
    });
};

export const getColorBySlug = (slug: string): string => {
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-pink-500',
        'bg-teal-500',
        'bg-orange-500',
        'bg-gray-500',
    ];

    const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % colors.length;

    return colors[index];
}

export const getAppName = (): string => {
    return "Fiona";
}
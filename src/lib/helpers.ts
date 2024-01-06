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
    const dots = text.length > length ? '...': '';
    return text.slice(0, length) + dots;
};
import algoliasearch from 'algoliasearch';
import { PUBLIC_ALGORIA_APP_ID, PUBLIC_ALGORIA_SEARCH_ONLY_API_KEY } from '$env/static/public';
import type { Blog } from './blog/blog';

const searchClient = algoliasearch(PUBLIC_ALGORIA_APP_ID, PUBLIC_ALGORIA_SEARCH_ONLY_API_KEY);

const index = searchClient.initIndex('blog_posts');

const search = async (query: string) => {
    try {
        const { hits } = await index.search(query);
        return hits;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la recherche avec Algolia :', error);
        throw error;
    }
};

const addObject = async (blog: Blog, update = false): Promise<Blog> => {
    const record = {
        objectID: blog.uid,
        title: blog.title,
        created_at: blog.created_at,
        cover: blog.cover,
        category: {
            slug: blog.category.slug,
        },
    }
    if (update) {
        const objectIDD = blog.uid;
        await index.saveObject({ objectIDD, ...record });
        return blog;
    }
    index.saveObject(record, { autoGenerateObjectIDIfNotExist: true }).wait();
    return blog;
}

const deleteObject = async (uid: string) => {
    await index.deleteObject(uid);
}


export { search as searchWithAlgoria, addObject as addAlgoriaObject, deleteObject as deleteAlgoriaObject };

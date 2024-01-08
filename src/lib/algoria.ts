import algoliasearch from 'algoliasearch';
import { PUBLIC_ALGORIA_APP_ID, PUBLIC_ALGORIA_SEARCH_ONLY_API_KEY } from '$env/static/public';

const searchClient = algoliasearch(PUBLIC_ALGORIA_APP_ID, PUBLIC_ALGORIA_SEARCH_ONLY_API_KEY);

const index = searchClient.initIndex('blog_posts');
const record = { objectID: 1, name: 'test_record' };

index.saveObject([record]).wait();

const search = async (query: string) => {
    try {
        const { hits } = await index.search(query);
        return hits;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la recherche avec Algolia :', error);
    throw error;
    }
};


export { search as searchWithAlgoria };

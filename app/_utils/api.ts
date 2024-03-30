import weaviate, { WeaviateClient, AuthAccessTokenCredentials } from 'weaviate-ts-client';


// Import the API keys from .env
const cohereApiKey = process.env.COHERE_API_KEY ? process.env.COHERE_API_KEY : '';
const weaviateApiKey = process.env.WEAVIATE_API_KEY ? process.env.WEAVIATE_API_KEY : '';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'https://cohere-demo.weaviate.network',
  authClientSecret: new AuthAccessTokenCredentials({
    accessToken: weaviateApiKey,
    expiresIn: 10^6,
  }),
  headers: {
    'X-Cohere-Api-Key': cohereApiKey,
  },
});

// const response = await client
// .schema
//   .getter()
//   .do();
// console.log(response);

async function semanticSearch(query: string, resultsLang: string = 'en'): Promise<void> {
  try {
    const nearText = { concepts: [query] };
    const properties = ['text', 'title', 'url', 'views', 'lang', '_additional {distance}'];

    // To filter by language
    let response;

    if (resultsLang !== '') {
      const whereFilter = {
        path: ['lang'],
        operator: 'Equal',
        valueString: resultsLang,
      };

      response = await client.graphql
        .get()
        .withClassName('Articles')
        .withFields(properties.join(' '))
        .withWhere(whereFilter)
        .withNearText(nearText)
        .withLimit(5)
        .do();

    } else {
      response = await client.graphql
        .get()
        .withClassName('Articles')
        .withFields(properties.join(' '))
        .withNearText(nearText)
        .withLimit(5)
        .do();
    }

    return response.data.Get.Articles;
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

export { semanticSearch };
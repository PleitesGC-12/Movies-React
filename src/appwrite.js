import {Client, Databases, Query, ID} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

// we get access to appwrite functionalites by defining a new appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

// define the specific functionality we want to use (in this case the database functionality)
const database = new Databases(client);


export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use Appwrite SDK to check if the search term exists in the database
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            // we are matching what we have in the database with what the users are searching for
            Query.equal('searchTerm', searchTerm),
        ])
        
        // 2. If it does, update the count
        if (result.documents.length > 0) {
            
            const doc = result.documents[0];
            
            await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1,
            })
            
        // 3. If it doesn't, create a new document with the search term and count as 1
        } else {
            
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch(error) {
        console.error(error);
    }
}

// we need to create another appwrite function to be able to fetch the top movies from the database
export const getTrendingMovies = async () => { // we don't need parameters because we are only fetching data
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.limit(5),
            Query.orderDesc("count") // sorted by count, those with highest count will appear on the start 
        ])
        
        return result.documents;

    } catch (error) {
        console.log(error)
    }  
} 

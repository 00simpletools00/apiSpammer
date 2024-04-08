const MongoClient = require('mongodb').MongoClient;

let client; 
let isConnectedToDB = false;

exports.isConnectedToMongoDB = () => {
    return isConnectedToDB;
};

exports.connectToMongoDBServer = async (connectionString) => {
    try {
        if(isConnectedToDB) return;
        client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        isConnectedToDB = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        isConnectedToDB = false;
        throw error; 
    }
};

exports.getDBList = async () => {
    try {
        const adminDb = client.db('admin');
        const databases = await adminDb.admin().listDatabases();
        const databaseNames = databases.databases.map(db => db.name);
        return databaseNames;
    } catch (error) {
        console.error('Error trying to retrieve DB names:', error);
        throw error; 
    }
};

exports.getCollectionsList = async (databaseName) => {
    try {
        const db = client.db(databaseName);
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        return collectionNames;
    } catch (error) {
        console.error(`Error retrieving collections for database ${databaseName}:`, error);
        throw error;
    }
};


exports.closeConnectionToMongoDBServer = async () => {
    try {
        await client.close();
        isConnectedToDB = true;
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error trying to close connection to MongoDB:', error);
        throw error; 
    }
};

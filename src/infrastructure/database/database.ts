import mongoose, { Connection } from 'mongoose';

export class Database {

    private static instance: Database;
    private readonly db: Connection;

    private constructor() {
        mongoose.connect(process.env.MONGODB_URI!);
        this.db = mongoose.connection;
    }

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            Database.instance = new Database();
            await Database.instance.connect();
        }
        return Database.instance;
    }

    private async connect() {
        try {
            await this.db;
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
}
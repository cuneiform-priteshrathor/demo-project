import mongoose, { connect } from 'mongoose';

class Database {
    public connect() {
        return connect('mongodb://localhost:27017/mydatabase')
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error: any) => {
                console.log('Error: ', error);

            })
    }
}

export default Database;

// try {
//     await mongoose.connect('mongodb://localhost:27017/mydatabase');
// } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1);
// }
// }
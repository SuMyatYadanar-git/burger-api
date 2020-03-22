const config = {
    database: {
        host: '172.105.123.57',
        user: 'kumo',
        password: 'kum0p@ssw0rd',
        port: 3306,
        database: 'burger_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    server: {
        host: '127.0.0.1',
        port: '5000'
    }
}

// const config = {
//     database: {
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         port: 3306,
//         database: 'demodb',
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0
//     },
//     server: {
//         host: '127.0.0.1',
//         port: '5000'
//     }
// }

module.exports = config
const config = {
    database: {
        host: 'localhost',
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

module.exports = config
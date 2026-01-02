require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB (will be implemented in Step 2)
        // await connectDB();

        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════════════╗
║                  ATLAS API SERVER                  ║
╠════════════════════════════════════════════════════╣
║  Status:    Running                                ║
║  Port:      ${PORT}                                    ║
║  Env:       ${process.env.NODE_ENV || 'development'}                          ║
║  Health:    http://localhost:${PORT}/health             ║
╚════════════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

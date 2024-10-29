import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import itemRoutes from './routes/itemRoutes';

const app = new Hono();

// Add item routes
app.route('/api', itemRoutes);

// Start the server
const port = 3000; // Choose your preferred port
const server = serve(app); // Start the server

// Handle any errors when starting the server
server.on('error', (error: Error) => {
    console.error('Failed to start server:', error.message);
});

// If the server starts successfully, log the URL
console.log(`Server is running at http://localhost:${port}`);
export default app;
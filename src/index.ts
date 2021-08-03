import app from './server';

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log('Express server running at: ' + port);
}); 
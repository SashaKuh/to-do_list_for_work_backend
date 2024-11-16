import env from './utils/env.js'
import app from './app.js'

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
        app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
        });
};


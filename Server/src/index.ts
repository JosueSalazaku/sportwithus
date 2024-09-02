import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { db } from './db'; // Assuming you're using this elsewhere in your app

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', async (req: express.Request, res: express.Response) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// API Routes fetching from Supabase
app.get('/api/projects', async (req, res) => {
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*');
        
    if (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ error: error.message });
    }
    
    // Parse tech_stack correctly (stored as comma-separated string)
    const formattedProjects = (projects || []).map(p => ({
        ...p,
        tech_stack: p.tech_stack ? p.tech_stack.split(',').map(s => s.trim()) : []
    }));
    
    res.json(formattedProjects);
});

app.get('/api/skills', async (req, res) => {
    const { data: skills, error } = await supabase
        .from('skills')
        .select('*');
        
    if (error) {
        console.error('Error fetching skills:', error);
        return res.status(500).json({ error: error.message });
    }
    
    res.json(skills || []);
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export the Express API
module.exports = app;

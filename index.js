require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// API Routes fetching from Supabase
app.get('/api/projects', async (req, res) => {
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*');
        
    if (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ error: error.message });
    }
    
    // Parse tech_stack correctly (stored as comma-separated string in supabase if matching old DB)
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const skills = [
  { name: 'Python & Java', proficiency: 90, category: 'Backend' },
  { name: 'Next.js & React', proficiency: 85, category: 'Frontend' },
  { name: 'Node.js & SQL', proficiency: 80, category: 'Backend' },
  { name: 'Cybersecurity', proficiency: 75, category: 'Tools' },
  { name: 'Graphic Design', proficiency: 85, category: 'Tools' },
  { name: 'Linux / Kali Linux', proficiency: 80, category: 'Tools' },
  { name: 'AWS & Networking', proficiency: 70, category: 'Backend' }
];

const projects = [
  {
    title: 'CLAMOR Assistant',
    description: 'CLAMOR is a Python-based voice-controlled AI assistant designed to empower physically disabled users by enabling hands-free interaction with computers. It leverages speech recognition, natural language command parsing, and task automation to perform everyday system and web operations through simple voice commands.',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    tech_stack: 'Python',
    link: 'https://github.com/abcdf12505/clamor-assistant'
  },
  {
    title: 'Car Rental System',
    description: 'A Car Rental System designed to automate vehicle booking, customer management, and rental operations. Includes user authentication, car availability tracking, booking history, and admin controls for efficient fleet management.',
    image_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600',
    tech_stack: 'Java',
    link: 'https://github.com/abcdf12505/car_rental_system'
  },
  {
    title: 'Phone Recommendation Chatbot',
    description: 'An intelligent chatbot built to recommend mobile phones based on user preferences. Deployed for seamless integration, enabling users to find their ideal smartphone interactively.',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    tech_stack: 'Python, Flask, AI',
    link: 'https://github.com/abcdf12505/Phone-Recommendation-Chatbot'
  }
];

async function seedData() {
  console.log("Seeding Supabase Database...");
  
  // Optional: clear existing data (if RLS allows)
  // await supabase.from('skills').delete().neq('id', 0);
  // await supabase.from('projects').delete().neq('id', 0);

  const { data: skillsData, error: skillsError } = await supabase.from('skills').insert(skills);
  if (skillsError) console.error("Error inserting skills:", skillsError.message);
  else console.log("Skills seeded successfully!");

  const { data: projectsData, error: projectsError } = await supabase.from('projects').insert(projects);
  if (projectsError) console.error("Error inserting projects:", projectsError.message);
  else console.log("Projects seeded successfully!");
  
  console.log("Seeding complete. You can now use Supabase Storage for project images!");
}

seedData();

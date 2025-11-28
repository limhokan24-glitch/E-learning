const { db } = require('./admin-init');

const lessonsData = [
  {
    title: 'Introduction to Node.js',
    module: 'Backend Development',
    content: 'This lesson covers the fundamentals of Node.js, V8, and non-blocking I/O.',
    order: 1
  },
  {
    title: 'What is Express.js?',
    module: 'Backend Development',
    content: 'Learn how to build a web server and REST APIs using Express, the most popular Node.js framework.',
    order: 2
  },
  {
    title: 'Understanding HTML & CSS',
    module: 'Frontend Development',
    content: 'The core building blocks of the web. Learn semantic HTML tags and modern CSS styling techniques.',
    order: 1 
  },
  {
    title: 'Introduction to React',
    module: 'Frontend Development',
    content: 'Build interactive user interfaces with React, the popular JavaScript library for building components.',
    order: 2
  },
  {
    title: 'Connecting to Databases',
    module: 'Backend Development',
    content: 'Learn how to connect your Node.js & Express server to databases like Firestore and PostgreSQL.',
    order: 3
  }
];

async function addDummyData() {
  console.log('Starting to add dummy lessons...');

  const addPromises = lessonsData.map(lesson => {
    return db.collection('lessons').add(lesson);
  });

  try {
    const documentReferences = await Promise.all(addPromises);
    
    console.log(` Success! Added ${documentReferences.length} lessons.`);
    documentReferences.forEach(docRef => {
      console.log(`  - Added lesson with ID: ${docRef.id}`);
    });

  } catch (error) {
    console.error('Error adding dummy lessons:', error.message);
  }
}

addDummyData();
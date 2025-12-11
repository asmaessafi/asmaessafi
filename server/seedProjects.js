import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Project from './models/Project.js'; // Adjust if your Project model is exported separately

const projects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Bazario is my multi-vendor e-commerce platform, built using the MERN stack (MongoDB, Express.js, React, and Node.js). I designed it to allow multiple vendors to register, add products, and manage their stores while customers browse and purchase effortlessly.Some of the key functionalities I implemented include vendor management, secure payment processing, inventory tracking, and a modern UI using React and Tailwind CSS. My goal was to make it scalable, efficient, and user-friendly.',
    imageUrl: '/bazario.jpeg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express' ],
    liveUrl: 'https://www.youtube.com/watch?v=3bOIfsT7UBM',
    live: 'https://front-bazario-no-changes.onrender.com/',
    featured: true,
    createdAt: new Date('2025-04-07').toISOString(),
  },
  {
    id: '2',
    title: 'Weather APP',
    description: 'A weather app using JavaScript requests dynamically fetches real-time weather data from APIs like OpenWeatherMap. It allows users to input or detect their location to retrieve details like temperature, humidity, and weather conditions. The app uses JavaScript to handle API requests and updates the interface with user-friendly and visually appealing elements to display weather information.',
    imageUrl: '/weatherapp.jpeg',
    technologies: ['HTML', 'CSS','JavaScript', 'APIs'],
    liveUrl: 'https://youtu.be/dm9JWCUCCig?si=J8-TwRbR1LU25-TE',
    githubUrl: 'https://github.com/asmaessafi/weather-app',
    featured: false,
    createdAt: new Date('2025-01-26').toISOString(),
  },
  {
    id: '3',
    title: 'ToDoList',
    description: "This project is a powerful, multi-function To-Do List application built using Redux Toolkit for state management. By leveraging Redux Toolkit's simplified and efficient structure, the app allows users to add, update, delete, and organize tasks with ease. It includes advanced features such as filtering tasks by status (e.g., completed, pending) and persistent state management, ensuring a seamless user experience.",
    imageUrl: '/redux-toolkit.jpeg',
    technologies: ['React',  'redux'],
    liveUrl: 'https://youtu.be/jOh9ZnTX5lo?si=5a8sIVCmo3dcy2_J',
    githubUrl: 'https://github.com/asmaessafi/todolist-with-RiduxToolKit',
    featured: false,
    createdAt: new Date('2025-02-25').toISOString(),
  },
  {
    id: '4',
    title: 'Sparkle',
    description: 'Sparkle store is a responsive, modern, and user-friendly web page designed to showcase products efficiently. It leverages the Bootstrap framework to create consistent layouts, style components, and provide interactive features like navigation bars, product cards, and responsive grids. With minimal additional CSS, the store offers a visually appealing interface, ensuring a seamless browsing experience across devices.',
    imageUrl: '/Sparkle.png',
    technologies: ['css Bootstrap', 'HTML' ],
    liveUrl: 'https://youtu.be/70Relb5VjFc?si=j_uZSRiO1olS3PaZ',
    githubUrl: 'https://github.com/asmaessafi/checkpoint-store',
    featured: false,
    createdAt: new Date('2024-10-25').toISOString(),
  },
  {
    id: '5',
    title: 'To-Do List App with React Hooks',
    description: 'A To-Do List application using React Hooks for efficient state management. It allows users to add, update, and delete tasks seamlessly while maintaining a clean and intuitive interface. With features like task filtering and persistent state handling, the app enhances productivity and ensures a smooth user experience.',
    imageUrl: '/todolist-hooks.jpeg',
    technologies: ['React', 'React Hooks'],
    liveUrl: 'https://youtu.be/7hv4Fhug8ZI?si=pYr2v_335aQ-gUVc',
    githubUrl: 'https://github.com/asmaessafi/todoList-with-reacthooks',
    featured: false,
    createdAt: new Date('2025-02-23').toISOString(),
  },
  {
    id: '6',
    title: 'WeCare Platform',
    description: 'responsive Blogger platform designed to inspire and promote a balanced lifestyle. By utilizing the powerful utility-first approach of Tailwind CSS, the blog ensures a clean and modern design. It features organized layouts for articles on mental health, physical fitness, mindfulness practices, and self-care tips, all with a seamless user experience. This blog embodies simplicity and elegance, encouraging readers to explore content that fosters personal growth and holistic well-being.',
    imageUrl: '/bloggersite.png',
    technologies: ['Tailwind CSS', 'HTML'],
    liveUrl: 'https://youtu.be/P2ihko3KyVU?si=lyeRlwNSLrrrn1N5',
    githubUrl: 'https://github.com/asmaessafi/Tailwaid',
    featured: true,
    createdAt: new Date('2024-10-30').toISOString(),
  },
  {
    id: '7',
    title: 'Movies Website',
    description: 'This project is a React-based movie web application that uses React Router for navigation. Users can browse a list of movies, filter them by title or rating, and add new movies to the list. Each movie card links to a detailed trailer page, where users can watch the trailer and read the movie description. The app demonstrates dynamic routing, state management, and component-based design for a modern movie browsing experience.',
    imageUrl: '/movies.png',
    technologies: ['React','State Managment', 'react router'],
    liveUrl: 'https://youtu.be/DEAO4-EFJk4?si=ziPBfGVBXq7gZJa6',
    githubUrl: 'https://github.com/asmaessafi/Movies-with-ReactHooks',
    featured: false,
    createdAt: new Date('2025-02-15').toISOString(),
  },
  {
    id: '8',
    title: 'React API User Fetcher',
    description: 'This project demonstrates the use of an API to fetch user data dynamically. By leveraging JavaScript, it sends requests to an external API (like JSONPlaceholder or similar services) to retrieve user information such as names, emails, addresses, and contact details. The fetched data is then displayed in a clean and responsive interface, showcasing real-time integration of API data.',
    imageUrl: '/reactapi.png',
    technologies: ['React','API'],
    liveUrl: 'https://youtu.be/smTV08kSBU4?si=TXYMByjlVBOdFg4D',
    githubUrl: 'https://github.com/asmaessafi/API-with-React',
    featured: false,
    createdAt: new Date('2025-02-09').toISOString(),
  },
  {
    id: '9',
    title: 'To-Do List App with React Managing State',
    description: 'This project is a To-Do List application built with React that demonstrates state management using React hooks. Users can add, edit, complete, and delete tasks, as well as filter tasks by status (all, completed, incomplete). The app also tracks task history and persists tasks in local storage for data retention across sessions.',
    imageUrl: '/todoManagingState.png',
    technologies: ['React','State Managment'],
    liveUrl: 'https://youtu.be/1zbrSGvaZbM?si=OzfEoSykUZVEbppF',
    githubUrl: 'https://github.com/asmaessafi/StateManaging-todoList',
    featured: false,
    createdAt: new Date('2025-02-22').toISOString(),
  },
  {
    id: '10',
    title: 'AI-Powered Content Generator',
    description: 'A sleek, AI-powered content generator built with Next.js, TypeScript, and Tailwind CSS. It allows users to create blog posts, social media captions, and product descriptions instantly using OpenAI’s API—styled with a clean UI, smart tone selection, and real-time SEO keyword suggestions. All frontend—no backend required.',
    imageUrl: '/content_creator.jpeg',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    liveUrl: 'https://youtu.be/ty0UDt6kVew?si=UdFyuSBzrhlxR9UK',
    githubUrl: 'https://github.com/asmaessafi/content-b-generator',
    featured: true,
    createdAt: new Date('2025-06-19').toISOString(),
  },{
    id: '11',
    title: 'Machida MMA – Gym Management Platform',
    description: 'Machida MMA Nabeul is my full-stack gym management system built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. It enables gym owners to efficiently manage members, track workouts and achievements, schedule classes, and monitor real-time performance metrics through intuitive admin and user dashboards. Key features include member management, progress tracking, role-based access, and a clean, responsive UI powered by React, Tailwind CSS, and Vite. Designed with scalable architecture, modular components, and type safety for maintainability and future growth.',
    imageUrl: '/machida.jpeg',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Vite'],
    liveUrl: 'https://youtu.be/-umcGdcq40I?si=q2r-87xKW4EDJQVf',
    featured: true,
    createdAt: new Date('2025-12-15').toISOString(),
  } 
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Project.deleteMany({});
  await Project.insertMany(projects);

  console.log('✅ Projects seeded!');
  mongoose.disconnect();
}

seed();
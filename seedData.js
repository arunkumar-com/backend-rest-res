const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');

dotenv.config();

const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true
    });

    // Create sample restaurants
    const restaurants = await Restaurant.insertMany([
      {
        name: 'The Italian Place',
        description: 'Authentic Italian cuisine in a cozy atmosphere',
        image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
        tables: {
          twoSeater: 6,
          fourSeater: 4
        }
      },
      {
        name: 'Sushi Master',
        description: 'Fresh and delicious Japanese sushi and sashimi',
        image: 'https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg',
        tables: {
          twoSeater: 8,
          fourSeater: 3
        }
      },
      {
        name: 'Burger House',
        description: 'Gourmet burgers and craft beers',
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
        tables: {
          twoSeater: 5,
          fourSeater: 5
        }
      },
      {
        name: 'Mediterranean Delight',
        description: 'Experience the authentic flavors of Mediterranean cuisine with our carefully crafted dishes and warm ambiance',
        image: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg',
        tables: {
          twoSeater: 7,
          fourSeater: 4
        }
      },
      {
        name: 'Asian Fusion Kitchen',
        description: 'Modern Asian fusion restaurant combining traditional flavors with contemporary culinary techniques',
        image: 'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg',
        tables: {
          twoSeater: 6,
          fourSeater: 5
        }
      }
    ]);

    console.log('Data seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

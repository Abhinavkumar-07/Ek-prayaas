const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Initiative = require('../models/Initiative');
const Event = require('../models/Event');
const Team = require('../models/Team');
const { Gallery, Admin } = require('../models/index');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected for seeding'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await Initiative.deleteMany({});
    await Event.deleteMany({});
    await Team.deleteMany({});
    await Gallery.deleteMany({});
    await Admin.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@ekprayas.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'super-admin'
    });

    console.log('👤 Admin user created - username: admin, password: admin123');

    // Seed Initiatives
    const initiatives = await Initiative.insertMany([
      {
        title: 'Kitabi Udaan',
        shortDescription: 'Providing educational materials to underprivileged government school students',
        description: 'Kitabi Udaan is our flagship initiative aimed at bridging the educational gap. We distribute notebooks, stationery, and learning materials to government school students who cannot afford them. Through this program, we ensure that financial constraints do not hinder a child\'s education.',
        category: 'education',
        image: '/uploads/kitabi-udaan.jpg',
        impact: {
          beneficiaries: 500,
          volunteers: 25,
          duration: 'Ongoing since 2022'
        },
        isActive: true
      },
      {
        title: 'Old Age Home Visits',
        shortDescription: 'Spending quality time with elderly people and bringing joy to their lives',
        description: 'We believe that elderly people deserve love, care, and companionship. Our volunteers regularly visit old age homes to spend time with residents, organize activities, celebrate festivals, and simply be there to listen to their stories.',
        category: 'elderly-care',
        image: '/uploads/oldage.jpg',
        impact: {
          beneficiaries: 150,
          volunteers: 30,
          duration: 'Monthly visits'
        },
        isActive: true
      },
      {
        title: 'Blood Donation Camp',
        shortDescription: 'Organizing blood donation drives to save lives',
        description: 'Blood donation saves lives. We organize regular blood donation camps in collaboration with local blood banks and hospitals. Every donation can save up to three lives, and we are proud to contribute to this noble cause.',
        category: 'health',
        image: '/uploads/blood-donation.jpg',
        impact: {
          beneficiaries: 200,
          volunteers: 40,
          duration: 'Quarterly events'
        },
        isActive: true
      }
    ]);

    console.log(`📚 Created ${initiatives.length} initiatives`);

    // Seed Events
    const events = await Event.insertMany([
      {
        title: 'Back to School Drive 2026',
        shortDescription: 'Distributing school supplies to 200 students',
        description: 'Join us for our annual Back to School drive where we distribute notebooks, pens, bags, and other school essentials to underprivileged children.',
        date: new Date('2026-04-15'),
        time: '10:00 AM - 2:00 PM',
        location: {
          venue: 'Community Center',
          address: 'Main Road, City Center',
          city: 'Your City'
        },
        category: 'drive',
        status: 'upcoming',
        attendees: {
          registered: 50,
          attended: 0
        },
        isPublished: true
      },
      {
        title: 'Diwali Celebration at Old Age Home',
        shortDescription: 'Celebrating the festival of lights with our elderly friends',
        description: 'Bring joy to the elderly by celebrating Diwali together. Activities include traditional games, sweets distribution, and cultural performances.',
        date: new Date('2025-10-20'),
        time: '4:00 PM - 7:00 PM',
        location: {
          venue: 'Sunrise Old Age Home',
          address: 'Green Valley Road',
          city: 'Your City'
        },
        category: 'celebration',
        status: 'completed',
        attendees: {
          registered: 35,
          attended: 32
        },
        isPublished: true
      }
    ]);

    console.log(`📅 Created ${events.length} events`);

    // Seed Team Members
    const team = await Team.insertMany([
      {
        name: 'Prabhat Sir',
        role: 'Faculty Advisor',
        designation: 'advisor',
        bio: 'Guiding force behind Ek-Prayas, inspiring students to make a difference',
        image: '/uploads/team/prabhat.jpg',
        displayOrder: 1,
        isActive: true
      },
      {
        name: 'Anubha Ma\'am',
        role: 'Faculty Coordinator',
        designation: 'advisor',
        bio: 'Dedicated mentor supporting our initiatives with passion and wisdom',
        image: '/uploads/team/anubha.jpg',
        displayOrder: 2,
        isActive: true
      },
      {
        name: 'Khushi Ma\'am',
        role: 'Faculty Coordinator',
        designation: 'advisor',
        bio: 'Committed to empowering students in their social welfare journey',
        image: '/uploads/team/khushi.jpg',
        displayOrder: 3,
        isActive: true
      },
      {
        name: 'John Doe',
        role: 'Club President',
        designation: 'president',
        department: 'Computer Science',
        year: 'Final Year',
        bio: 'Leading Ek-Prayas with vision and dedication',
        email: 'john@example.com',
        displayOrder: 4,
        isActive: true
      }
    ]);

    console.log(`👥 Created ${team.length} team members`);

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

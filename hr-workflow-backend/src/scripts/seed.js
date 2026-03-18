/**
 * Database Seed Script
 * 
 * Run with: npm run seed
 * 
 * Seeds the database with:
 * - Default HR categories
 * - Sample tasks across different categories and statuses
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Task, Category } = require('../models');
const { DEFAULT_CATEGORIES } = require('../constants');
const { env } = require('../config');

/**
 * Sample task data generator
 */
const generateSampleTasks = (categories) => {
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat._id;
  });

  const now = new Date();
  const daysFromNow = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return [
    // Consultant Queries
    {
      title: 'Respond to John Smith salary query',
      description: 'Consultant requesting clarification on bonus structure for Q1 2026',
      status: 'new',
      category: categoryMap['consultant_queries'],
      priority: 'medium',
      assignee: 'Sarah Johnson',
      dueDate: daysFromNow(3),
      tags: ['salary', 'bonus']
    },
    {
      title: 'Update consultant handbook section 4.2',
      description: 'Add new remote work policy guidelines',
      status: 'in_progress',
      category: categoryMap['consultant_queries'],
      priority: 'low',
      assignee: 'Mike Chen',
      dueDate: daysFromNow(7)
    },

    // Visa
    {
      title: 'Process H1B application for Maria Garcia',
      description: 'Complete I-797 documentation and submit to USCIS',
      status: 'in_progress',
      category: categoryMap['visa'],
      priority: 'urgent',
      assignee: 'Sarah Johnson',
      dueDate: daysFromNow(5),
      tags: ['h1b', 'urgent', 'uscis']
    },
    {
      title: 'Visa renewal reminder - Ahmed Hassan',
      description: 'Current visa expires in 60 days, initiate renewal process',
      status: 'new',
      category: categoryMap['visa'],
      priority: 'high',
      assignee: 'Jennifer Lee',
      dueDate: daysFromNow(14)
    },
    {
      title: 'L1 visa transfer for Tokyo office',
      description: 'Coordinate with legal team for intra-company transfer',
      status: 'done',
      category: categoryMap['visa'],
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: daysAgo(2),
      completedAt: daysAgo(1)
    },

    // Payroll
    {
      title: 'Process March payroll adjustments',
      description: 'Apply overtime calculations and bonuses for March cycle',
      status: 'in_progress',
      category: categoryMap['payroll'],
      priority: 'high',
      assignee: 'David Wilson',
      dueDate: daysFromNow(2),
      tags: ['monthly', 'overtime']
    },
    {
      title: 'Update tax withholding for 2026',
      description: 'Apply new federal tax rates effective April 1',
      status: 'new',
      category: categoryMap['payroll'],
      priority: 'medium',
      assignee: 'David Wilson',
      dueDate: daysFromNow(10)
    },
    {
      title: 'Resolve duplicate payment issue - Employee #4521',
      description: 'Investigate and correct double payment in February',
      status: 'done',
      category: categoryMap['payroll'],
      priority: 'urgent',
      assignee: 'David Wilson',
      dueDate: daysAgo(5),
      completedAt: daysAgo(4)
    },

    // Onboarding
    {
      title: 'New hire orientation - Week of March 23',
      description: 'Prepare materials for 5 new consultants starting next week',
      status: 'in_progress',
      category: categoryMap['onboarding'],
      priority: 'high',
      assignee: 'Emily Davis',
      dueDate: daysFromNow(6),
      tags: ['batch-onboarding', 'consultants']
    },
    {
      title: 'Setup workstations for Chicago office hires',
      description: 'Coordinate with IT for 3 new workstations',
      status: 'new',
      category: categoryMap['onboarding'],
      priority: 'medium',
      assignee: 'Emily Davis',
      dueDate: daysFromNow(4)
    },
    {
      title: 'Complete I-9 verification - March cohort',
      description: 'Verify employment eligibility for all March hires',
      status: 'done',
      category: categoryMap['onboarding'],
      priority: 'high',
      assignee: 'Jennifer Lee',
      dueDate: daysAgo(1),
      completedAt: daysAgo(1)
    },

    // Compliance
    {
      title: 'Annual EEO-1 report preparation',
      description: 'Compile demographic data for federal reporting',
      status: 'in_progress',
      category: categoryMap['compliance'],
      priority: 'high',
      assignee: 'Mike Chen',
      dueDate: daysFromNow(15),
      tags: ['annual', 'federal', 'eeo']
    },
    {
      title: 'Update harassment prevention training records',
      description: 'Ensure all employees completed required training',
      status: 'new',
      category: categoryMap['compliance'],
      priority: 'medium',
      assignee: 'Jennifer Lee',
      dueDate: daysFromNow(20)
    },

    // Employee Relations
    {
      title: 'Mediate conflict resolution - Engineering team',
      description: 'Schedule meeting between parties and document outcome',
      status: 'in_progress',
      category: categoryMap['employee_relations'],
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: daysFromNow(1),
      tags: ['confidential', 'mediation']
    },
    {
      title: 'Process internal transfer request - Lisa Wong',
      description: 'Evaluate transfer from Sales to Marketing department',
      status: 'new',
      category: categoryMap['employee_relations'],
      priority: 'medium',
      assignee: 'Mike Chen',
      dueDate: daysFromNow(7)
    },

    // Benefits
    {
      title: 'Open enrollment communication',
      description: 'Send benefit options email to all employees',
      status: 'done',
      category: categoryMap['benefits'],
      priority: 'high',
      assignee: 'Emily Davis',
      dueDate: daysAgo(3),
      completedAt: daysAgo(2)
    },
    {
      title: 'Process 401k contribution changes',
      description: 'Apply Q2 contribution updates for 23 employees',
      status: 'new',
      category: categoryMap['benefits'],
      priority: 'medium',
      assignee: 'David Wilson',
      dueDate: daysFromNow(5)
    },

    // Recruitment
    {
      title: 'Schedule interviews - Senior Developer role',
      description: 'Coordinate panel interviews for 6 shortlisted candidates',
      status: 'in_progress',
      category: categoryMap['recruitment'],
      priority: 'high',
      assignee: 'Jennifer Lee',
      dueDate: daysFromNow(3),
      tags: ['engineering', 'senior']
    },
    {
      title: 'Post job listing - HR Coordinator',
      description: 'Create and publish job posting on all platforms',
      status: 'new',
      category: categoryMap['recruitment'],
      priority: 'medium',
      assignee: 'Emily Davis',
      dueDate: daysFromNow(2)
    },
    {
      title: 'Reference checks - Marketing Manager candidates',
      description: 'Complete background verification for final 2 candidates',
      status: 'done',
      category: categoryMap['recruitment'],
      priority: 'high',
      assignee: 'Mike Chen',
      dueDate: daysAgo(2),
      completedAt: daysAgo(1)
    },

    // Additional overdue tasks for testing
    {
      title: 'URGENT: Complete compliance audit response',
      description: 'Respond to state labor board inquiry',
      status: 'in_progress',
      category: categoryMap['compliance'],
      priority: 'urgent',
      assignee: 'Sarah Johnson',
      dueDate: daysAgo(2),
      tags: ['audit', 'overdue']
    },
    {
      title: 'Follow up on missing timesheet - Project Alpha',
      description: 'Contact consultant about missing entries',
      status: 'new',
      category: categoryMap['payroll'],
      priority: 'medium',
      assignee: 'David Wilson',
      dueDate: daysAgo(1)
    }
  ];
};

/**
 * Seed the database
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to MongoDB
    await mongoose.connect(env.mongodbUri);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Task.deleteMany({});
    await Category.deleteMany({});
    console.log('   Done.\n');

    // Seed categories
    console.log('📁 Seeding categories...');
    const categories = await Category.insertMany(DEFAULT_CATEGORIES);
    console.log(`   Created ${categories.length} categories.\n`);

    // Seed tasks
    console.log('📝 Seeding tasks...');
    const taskData = generateSampleTasks(categories);
    const tasks = await Task.insertMany(taskData);
    console.log(`   Created ${tasks.length} tasks.\n`);

    // Summary
    console.log('═══════════════════════════════════════════════════');
    console.log('                  SEED SUMMARY                     ');
    console.log('═══════════════════════════════════════════════════');
    console.log(`Categories: ${categories.length}`);
    console.log(`Tasks: ${tasks.length}`);
    console.log('');
    console.log('Tasks by status:');
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  - ${status}: ${count}`);
    });
    console.log('═══════════════════════════════════════════════════');
    console.log('\n✅ Database seeded successfully!\n');

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('📡 Database connection closed.');
    process.exit(0);
  }
};

// Run seed
seedDatabase();

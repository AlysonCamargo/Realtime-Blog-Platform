const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const postRoutes = require('../routes/posts');
const { errorHandler } = require('../middlewares/errorHandler');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/api/posts', postRoutes);
  app.use(errorHandler);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Post API', () => {
  it('should create a new post', async () => {
    const res = await request(app).post('/api/posts').send({
      title: 'Test Post',
      content: 'This is a test post content with enough length.',
      author: 'Tester',
      category: 'Technology'
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test Post');
  });

  it('should fail if title is missing', async () => {
    const res = await request(app).post('/api/posts').send({
      content: 'Content without title',
      author: 'Tester'
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});

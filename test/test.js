'use strict';
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('/index.js', () => {
  test('タイトルが表示される', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/OOpartsゲーム一覧/)
      .expect(200);
  });
});
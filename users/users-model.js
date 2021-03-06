const db = require('../database/dbConfig.js');

module.exports = {
  add,
  getUserById,
  findByUsername,
  getUserProjects,
  addProject,
  addProjectStory,
  getStoryById
};

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return getUserById(id);
}

function findByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}

// PROJECTS
function getUserProjects(user_id) {
  return db('projects')
    .select('name')
    .where({ user_id });
}

function getProjectById(id) {
  return db('projects')
    .where({ id })
    .first();
}

async function addProject(project) {
  const [projectId] = await db('projects').insert(project);
  return getProjectById(projectId);
}

// STORIES
function getStoryById(id) {
  return db('stories')
    .where({ id })
    .first();
}

async function addProjectStory(story) {
  const [storyId] = await db('stories').insert(story);
  return getStoryById(storyId);
}

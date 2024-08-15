// import * as fs from "node:fs";
// import { faker } from "@faker-js/faker";
// import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: uuidv4(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      profileImage: faker.image.avatar(),
    });
  }
  return users;
};

const generateLabels = () => {
  const labels = [];
  const labelCount = faker.number.int({ min: 1, max: 5 });
  for (let i = 0; i < labelCount; i++) {
    labels.push({
      id: uuidv4(),
      tag: faker.word.noun(),
      color: faker.color.rgb(),
    });
  }
  return labels;
};

const generateComments = (users) => {
  const comments = [];
  const commentCount = faker.number.int({ min: 1, max: 5 });
  for (let i = 0; i < commentCount; i++) {
    const randomUser =
      users[faker.number.int({ min: 0, max: users.length - 1 })];
    comments.push({
      id: uuidv4(),
      content: faker.lorem.sentence(),
      author: randomUser,
      createdAt: faker.date.recent().toISOString(),
    });
  }
  return comments;
};

const generateAttachments = (users) => {
  const attachments = [];
  const attachmentCount = faker.number.int({ min: 1, max: 3 });
  for (let i = 0; i < attachmentCount; i++) {
    const randomUser =
      users[faker.number.int({ min: 0, max: users.length - 1 })];
    const isPdf = faker.datatype.boolean();
    attachments.push({
      id: uuidv4(),
      content: isPdf ? "PDF Document" : "Image File",
      downloadUrl: isPdf
        ? faker.internet.url() + "/file.pdf"
        : faker.image.url(),
      author: randomUser,
      createdAt: faker.date.recent().toISOString(),
    });
  }
  return attachments;
};

const generateCards = (users) => {
  const cards = [];
  const cardCount = faker.number.int({ min: 1, max: 5 });
  for (let i = 0; i < cardCount; i++) {
    cards.push({
      id: uuidv4(),
      taskId: uuidv4(),
      title: faker.commerce.productName(),
      description: faker.lorem.paragraphs(2),
      coverPhoto: faker.image.urlPicsumPhotos(),
      order: i + 1, // sequential order
      labels: generateLabels(),
      comments: generateComments(users),
      attachments: generateAttachments(users),
      createdAt: faker.date.recent().toISOString(),
    });
  }
  return cards;
};

const generateTaskLists = (users) => {
  const taskLists = [];
  const taskListCount = faker.number.int({ min: 3, max: 5 });
  for (let i = 0; i < taskListCount; i++) {
    taskLists.push({
      id: uuidv4(),
      title: faker.company.buzzPhrase(),
      createdAt: faker.date.recent().toISOString(),
      cards: generateCards(users),
    });
  }
  return taskLists;
};

const generateBoards = (users) => {
  const boards = [];
  for (let i = 0; i < 5; i++) {
    const members = [];
    const memberCount = faker.number.int({ min: 3, max: 8 });
    for (let j = 0; j < memberCount; j++) {
      members.push(users[faker.number.int({ min: 0, max: users.length - 1 })]);
    }
    const admin =
      members[faker.number.int({ min: 0, max: members.length - 1 })];

    boards.push({
      id: uuidv4(),
      title: faker.company.catchPhrase(),
      description: faker.company.catchPhraseDescriptor(),
      coverPhoto: faker.image.urlPicsumPhotos(),
      visibility: faker.helpers.arrayElement(["public", "private"]),
      createdAt: faker.date.recent().toISOString(),
      members: members,
      admin: admin,
      taskLists: generateTaskLists(users),
    });
  }
  return boards;
};

const users = generateUsers(10);
const boards = generateBoards(users);

fs.writeFileSync("./src/data/users.json", JSON.stringify(users, null, 2));
fs.writeFileSync("./src/data/boards.json", JSON.stringify(boards, null, 2));

console.log("Data generated and saved to users.json and boards.json");

<h1 align="center">Thullo - Trello Clone</h1>

<div align="center">
   Solution for a challenge from  <a href="http://legacy.devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://thullo-fawn.vercel.app" target="_blank">
      Demo
    </a>
    <span> | </span>
    <a href="#" target="_blank">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/wP0LbGgEeKhpFHUpPpDh" target="_blank">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Built With](#built-with)
- [Features](#features)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](./public/images/Screenshot.png)

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/render217/Thullo
    ```

2.  Create a .env file add the following as key = value

          ```
            DATABASE_URL=   bash your database url
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= your clerk_publishable_key
            CLERK_SECRET_KEY= your clerk_secret_key
            WEBHOOK_SECRET= your clerk_webhook_key
            NEXT_PUBLIC_API_URL= next_api_url/api
            NEXT_PUBLIC_UNSPLASH_APP_ID= your unsplash_app_id
            NEXT_PUBLIC_UNSPLASH_ACCESS_KEY= your unsplash_access_key
            NEXT_PUBLIC_UNSPLASH_SECRET_KEY= your unsplash_secret_key
            UPLOADTHING_SECRET= your uploadthing_secret
            UPLOADTHING_APP_ID= your uploadthing_app_id

          ```

3.  install dependencies:

    ```bash
    npm install
    ```

4.  Start the development
    ```bash
    npm run dev
    ```

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- **Next.js**
- **Prisma**
- **Shad-cn**
- **Tailwind**
- **Zustand**
- **Clerk**
- **uploadthing**

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://legacy.devchallenges.io/challenges/wP0LbGgEeKhpFHUpPpDh) challenge. The [challenge](https://legacy.devchallenges.io/challenges/wP0LbGgEeKhpFHUpPpDh) was to build an application to complete the given user stories.

- User story: I can list of available boards
- User story: I can add a new board with a cover photo, title and visibility options
- User story: I can see a board with different columns, team members,... according to the design
- User story: I can add a new list
- User story: I can add a new card to the existing list
- User story: I can set the visibility of the board
- User story: I can add a member to the board (user must exist in the system)
- User story: I can change the name of the board by selecting it
- User story: I can change/add the description of the board
- User story: Given I am an admin, I can remove members from the board
- User story: I can move a card from a column to another one by drag and drop
- User story: When a card is selected, I can rename the title by selecting it
- User story: When a card is selected, I can see which column the card belongs to
- User story: When a card is selected, I can see and change the description
- User story: When a card is selected, I can add new attachments and I can download and delete existing attachments
- User story: When a card is selected, I can add a new comment. Given I am the author, I can edit and delete the comment.
- User story: When a card is selected, I can change the card cover image by searching from Unsplash
- User story: When a card is selected, I can add labels with given colors

---

## Features to be added.

- Board Invites,...

## Acknowledgements

- [Vercel](https://vercel.com) - For Deployment
- [Clerk](https://clerk.com) - For Authentication.
- [Unsplash](https://unsplash.com/) - For Image Api.
- [UploadThing](https://uploadthing.com/)- For File upload.

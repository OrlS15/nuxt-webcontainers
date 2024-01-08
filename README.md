# Nuxt WebContainers

## Project Status: Experimental and Incomplete

**Note:** This project is currently in an experimental stage and is not considered complete. Feel free to explore, but be aware that features and functionality might be incomplete.

- [x] Add support for public GitHub repos
- [x] Add support for private GitHub repos
- [ ] Replace current code editor with Monaco Editor
- [ ] feat: moving files and dirs
- [ ] feat: deleting files and dirs
- [ ] feat: renaming files and dirs
- [ ] feat: terminal

## What's This?

Nuxt WebContainers is a project designed to leverage the capabilities of [webcontainers](https://webcontainers.io/), enabling the execution of Node.js applications directly within a web browser environment. This project allows users to run public GitHub repositories or even log in to their GitHub accounts to test and execute private repositories, all without the need to download the codebase to their local machines.

## Tech Stack

This project utilizes a number of technologies:

- **Nuxt 3:** A Vue.js framework for building universal Vue.js applications.
- **Shade UI Vue:** A UI component library for Vue.js.
- **GitHub API:** GitHub's API to integrate GitHub features into our project.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.
- **WebContainers:** A technology that allows running Node.js applications directly within a web browser environment.
- **Pinia:** State management library for Vue.js that is intuitive and devtools-friendly.

## Key Features

- **Browser-based Execution:** Utilize the power of webcontainers.io to run Node.js applications directly in your web browser.

- **GitHub Integration:** Easily load public GitHub repositories or log in to your GitHub account to access and test private repositories.

- **Integrated Development Environment (IDE)** Explore an integrated environment with a code editor, file explorer, and an output display for your app's results.

- **Lazy Testing:** Skip the hassle of downloading GitHub repos to your PC – test them on the fly!

## How to Use

1. **Clone This Repo:**

   ```bash
   git clone https://github.com/OrlS15/nuxt-webcontainers
   ```

2. **Install Dependencies:**
   ```bash
   cd nuxt-webcontainers
   npm install
   ```
3. **Create a GitHub OAuth App:**

   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click **New OAuth App**
   - Fill in the form with the following information:
     - **Homepage URL:** http://localhost:3000
     - **Authorization Callback URL:** http://localhost:3000/api/github/callback
   - Click **Register Application**
   - Copy the **Client ID** and **Client Secret** values

4. **Create a `.env` File:**

   - Create a `.env` file in the root directory of the project
   - Add the following lines to the file:
     ```bash
     NUXT_PUBLIC_GITHUB_CLIENT_ID=<your_client_id>
     NUXT_GITHUB_CLIENT_SECRET=<your_client_secret>
     ```
   - Replace `<your_client_id>` and `<your_client_secret>` with the values you copied in the previous step

5. **Run the App:**
   ```bash
    npm run dev
   ```

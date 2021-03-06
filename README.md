*PLEASE READ NOTES SECTION CAREFULLY BEFORE RUNNING APP*

# Live Demo
https://zeyad-giphy.netlify.app/

## Notes
- I'm using a beta api key for Giphy, So its rate limit is 1000 request/day, and 42 requests/hour.
- I'm using a firebase to save users' favorites.
- For local demo, I can send the environment keys by email, please don't forget to copy them in `.env.local`

## Tech Stack

1. **TypeScript**
2. **ReactJS**
3. **NextJS**
4. **Firebase:** To handle users, and favourits for them.
5. **redux/toolkit:** To manage state across the app.
6. **Giphy:** I've used Giphy to handle List gifs, and getting them.
7. **Netlify:** Deployment.
8. **GitHubActions:** CI
9. **scss:** using scss for styling.
10. **prettier** Force code styling.
11. **Eslint:** Catch code errors.
12. **dotenv:** handling env variables.
13. **jest:** testing.
14. **nock:** mock api testing.
15. **lint-staged, husky:** Force code styling using git hooks.

## Run on Development
- `npm i`
- `npm run dev`

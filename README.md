# Dynamic Weather App
 High Quality Production level frontend application for weather app uses next js
-Follows best practices in terms of performance, readability, maintainability, and extensibility of the project



## Tech
- Next.js
- Tailwind
- Tanstack Query - for API caching and server state
- Zustand - for client side caching
- Typescript - for static typing and compile time warning

## Features
- Fetches cities from api with infinite scroll 
- Fetches weather and forecast data from an API.
- Displays weather information such as temperature, humidity, pressure, etc.
- Allows users to toggle between Celsius and Kelvin temperature units.
- Dynamic background based on time of the day for forecast data
- City Table Supports Sorting And Searching
- Supports Geo Location Feature
- User Can Save Favorites Location
- Supports dark and light theme
- Api data is cached locally to prevent redundunt api call
- Application is fully responsive for different device screens such as mobile,table,desktop
- For layout, it uses neumorphic and minimalist design



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
### How TO Run

Clone the Repository:
```bash
    git clone <repository-url>
```
Navigate to the Project Directory: 
```bash
cd <project-directory>
```
Install Dependencies
```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

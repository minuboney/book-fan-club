This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Details of this Project:

In this project, I have used Next.js because it has built-in file system routing and typescript support. It also has many powerful features such as fast refresh.

I have used createContext, useContext hook to access the role state throughout the pages.

I have used higher order components(hoc) to give role privileges. To achieve this, I have used the withProtectRoute component. You can see, users and books are wrapped using this hoc. Hence, those pages cannot be accessed without login.

For styling I have used react bootstrap. I used the same for table styling.

For the Analytics page, I used package `victory` to create charts.

For making the code neat and clean, I have used custom hooks. It is mainly using the useReducer hook.

For optimising the filter and sort, I have used the useMemo hook.

I have also created smaller components for better readability and for reusing it.

I have deployed this project using Vercel and the url is https://book-fan-club.vercel.app

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

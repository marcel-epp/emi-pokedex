# EMI-Pokedex

Hello and welcome to the Emi-Pokedex!

This is a learning project, to get started with [NEXT.js](https://nextjs.org/). I was too old for pokemon, when it started. But my daughters love this. I can hardly remeber the names. So i tried to build a pokedex, where i can find a pokemon based on there color and the look. So that i have name. The following instructions are for learning purposes. I will describe, how i build this project.

Requirements:

Basic knowledge about:

- html
- css
- javascript
- react

Please install the [VS Code Editor](https://code.visualstudio.com/).

## 1. Step Initial Setup

Navigate to a folder on your computer where the project can live. I choosed a folder called websites. Then you open a terminal window and put this in:

```
npx create-next-app@latest
```

If you do this for the first time, you would be asked to install the create-next-app@14.1.0 package. Here you can press the enter key. At the point of writing, nextjs 14 was the newest version.

```
Need to install the following packages:
create-next-app@14.1.0
Ok to proceed? (y)
```

After that you can choose some options. Please look at the nextjs [docs](https://nextjs.org/docs/getting-started/installation) if you want to know more about that. I choosed this options:

```
✔ What is your project named? … emi-pokedex
✔ Would you like to use TypeScript? … No
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … No
✔ Would you like to customize the default import alias (@/*)? … No
```

When the project is ready you can switch to the folder. This is a good time to open [VS Code Editor](https://code.visualstudio.com/) and open the folder in VS Code. Please open a terminal window in VS Code. You can find the icon for that in the upper right corner Your file structure should now look like this:

```
.
├──.next
├──node_modules
├──pages
│   ├──api
│   ├──_app.js
│   ├──_document.js
│   ├──_index.js
├──public
├──styles
├──.eslintrc.json
├──.gitignore
├──jsconfig.json
├──next.config.mjs
├──package-lock.json
├──package.json
├──README.md
```

Now you can start the server for the first time:

```
npm run dev
```

In the terminal in VS Code you can click the link http://localhost:3000 (mac: hold command and click, windows: i think strg and click ) or you can paste it in your browser of choice. I recommend using chrome or firefox.

## 2. Step Removing all things we don't need

First we go into the "index.js" under the "pages" folder and delete everything we don't need. It should look like this now:

```Javascript
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>EMI - Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello from Next.js</h1>
      </main>
    </>
  );
}
```

After you press save the site in the browser looks a little weird. we will fix this in the next steps. 😉

Now we remove the "Home.module.css" in the "styles" folder:

```
.
...
├──public
├──styles
│   ├──globals.css
│   ├──Home.module.css <-- delete this file
├──.eslintrc.json
...
```

In same folder edit "globals.css" to:

```Javascript
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
}

```

This sets the border-box, and a nicer font. The site should now be white with a text "Hello from Next.js" Under the public folder you can remove the files "next.svg" and "vercel.svg"

```
.
...
├──public
│   ├──favicon.ico
│   ├──next.svg <-- delete this file
│   ├──vercel.svg <-- delete this file
├──.eslintrc.json
...
```

## 3. Step Let's build a pokedex!

The first thing that i will do, is to display some pokemons on the homepage. To fetch the pokemon i will use the [SWR](https://swr.vercel.app/) library. I stop my running server with the command "control + c". On windows it should be "STRG + c". Then i install the library with:

```
npm i swr
```

Now we import swr to use it. You can open pages/index.js and put this on the top:

```Javascript
import useSWR from "swr";
```

The next step is to create a fetcher. Luckily we can take the example from there website:

```Javascript
const fetcher = (...args) => fetch(...args).then((res) => res.json());
```

For the URL i make a new const, and save it there:

```Javascript
const URL = "https://pokeapi.co/api/v2/pokemon";
```

After that we put the fetch from swr in the function Home() and console.log the data.

```Javascript
const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>failed to load</h1>;
  }
  console.log(data);
```

In the return we map "data.results" (in results we can find name and other things. Take a look in the console in the browser) between main we put:

```Javascript
<main>
  <h1>Pokemon List</h1>
  <ul>
    {data.results.map(({ name }) => (
      <li key={name}>{name}</li>
    ))}
  </ul>
</main>
```

### => please expand the dropdown to see the whole index.js!

<details>
<summary>This is how the index.js should look right now with the first 20 pokemon</summary>

```Javascript
import useSWR from "swr";
import Head from "next/head";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const URL = "https://pokeapi.co/api/v2/pokemon";

export default function Home() {
  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>failed to load</h1>;
  }
  console.log(data);

  return (
    <>
      <Head>
        <title>EMI - Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Pokemon List</h1>
        <ul>
          {data.results.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
```

</details>

---

We only get the first 20 pokemon but not more. The api has a pagination build in. First we put two buttons in the pages/index.js under the pokemon list. The buttons can't do anything right now. the only log to the console, that they are clicked.

```Javascript
<button
  type="button"
  onClick={() => {
    console.log("prev button");
  }}>
  Previous Button
</button>
<button
  type="button"
  onClick={() => {
    console.log("next button");
  }}>
  Next Button
</button>
```

![website with buttons](../emi-pokedex/public/instruction_images/pokemon-01.png)

Now we import the useState from react.

```Javascript
import { useState } from "react";
```

And put it in the Home() function before the fetch.

```Javascript
const [siteId, setSiteId] = useState(0);
```

The buttons also get an update. They should set the state up or down.

```Javascript
<button
  type="button"
  disabled={siteId === 0}
  onClick={() => {
    setSiteId((siteId) => siteId - 20);
    console.log("prev button");
  }}>
  Previous Button
</button>
```

```Javascript
<button
  type="button"
  onClick={() => {
    setSiteId((siteId) => siteId + 20);
    console.log("next button");
  }}>
  Next Button
</button>
```

At this point, the app is not crashing. But also not working. We have to tell the fetcher that we want to give a number at the end of the url. We can now copy the url from the const URL and put it in the fetcher with backticks. So that we can put the state at the end of the url.

```Javascript
const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon?offset=${siteId}`, fetcher);
```

### => please expand the dropdown to see the whole index.js!

<details>
<summary>The whole index.js should look like this now.</summary>

```Javascript
import useSWR from "swr";
import Head from "next/head";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [siteId, setSiteId] = useState(0);
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon?offset=${siteId}`, fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>failed to load</h1>;
  }
  console.log(data);

  return (
    <>
      <Head>
        <title>EMI - Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Pokemon List</h1>
        <ul>
          {data.results.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <button
          type="button"
          disabled={siteId === 0}
          onClick={() => {
            setSiteId((siteId) => siteId - 20);
            console.log("prev button");
          }}>
          Previous Button
        </button>
        <button
          type="button"
          onClick={() => {
            setSiteId((siteId) => siteId + 20);
            console.log("next button");
          }}>
          Next Button
        </button>
      </main>
    </>
  );
}
```

</details>

The App should now work as expected. On load the site will list the first 20 pokemon. When you click on a button. The next 20 pokemon will load. 🥳

## 4. Step Let's make it beautiful
# GrokTeamDemo

SCRUM-17: a static Good Morning page that shows a random motivational quote from the internet.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 4173
```

Then visit [http://localhost:4173](http://localhost:4173).

The page greets you with **Good Morning** and loads a random quote from [DummyJSON](https://dummyjson.com/docs/quotes). If the API is unreachable, it falls back to a small local set of quotes. Use **Another quote** to fetch a new one.

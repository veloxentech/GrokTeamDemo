const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteStatus = document.getElementById("quote-status");
const quoteFigure = document.querySelector(".quote");
const newQuoteButton = document.getElementById("new-quote");

const FALLBACK_QUOTES = [
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote: "An early-morning walk is a blessing for the whole day.",
    author: "Henry David Thoreau",
  },
  {
    quote: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman",
  },
  {
    quote: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston",
  },
];

const QUOTE_API = "https://dummyjson.com/quotes/random";

function setBusy(isBusy) {
  quoteFigure.setAttribute("aria-busy", String(isBusy));
  quoteFigure.classList.toggle("is-loading", isBusy);
  newQuoteButton.disabled = isBusy;
}

function renderQuote({ quote, author }, sourceLabel) {
  quoteText.textContent = `“${quote}”`;
  quoteAuthor.textContent = author || "Unknown";
  quoteStatus.textContent = sourceLabel;
}

function pickFallbackQuote() {
  return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
}

async function fetchInternetQuote() {
  const response = await fetch(QUOTE_API, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Quote API returned ${response.status}`);
  }

  const data = await response.json();
  if (!data || typeof data.quote !== "string") {
    throw new Error("Quote API returned an unexpected payload");
  }

  return {
    quote: data.quote.trim(),
    author: (data.author || "Unknown").trim(),
  };
}

async function loadQuote() {
  setBusy(true);
  quoteStatus.textContent = "Fetching a quote from the internet…";

  try {
    const quote = await fetchInternetQuote();
    renderQuote(quote, "Random quote via DummyJSON");
  } catch (error) {
    console.warn("Could not load an internet quote:", error);
    renderQuote(
      pickFallbackQuote(),
      "Internet quote unavailable — showing a local favorite instead"
    );
  } finally {
    setBusy(false);
  }
}

newQuoteButton.addEventListener("click", loadQuote);
loadQuote();

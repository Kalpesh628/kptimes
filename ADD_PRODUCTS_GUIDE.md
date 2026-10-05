# Adding products to the KP Times Store

You never touch code. Products are individual JSON files in `store/products/`,
and the store discovers them automatically. One bad file is skipped — it can
never break the store.

## Add a product (30 seconds, github.com only)

1. Go to your repo → `store` → `products` folder.
2. Click **Add file → Create new file**.
3. Name it something like `boat-headphones.json` (must end in `.json`).
4. Paste the template below, fill in your details, then **Commit changes**.

```json
{
  "id": "boat-headphones",
  "name": "boAt Rockerz 450 Bluetooth Headphones",
  "price": 1499,
  "mrp": 3990,
  "image": "https://m.media-amazon.com/images/I/your-image.jpg",
  "amazon_url": "https://www.amazon.in/dp/B07PR1CLI5",
  "category": "Tech",
  "badge": "Bestseller",
  "rating": 4.3,
  "blurb": "One honest line on why this is worth buying."
}
```

Field notes:
- `price` / `mrp`: numbers only, no ₹, no commas. `mrp` higher than `price` shows the discount + strike-through. Omit `mrp` (or set equal) for no discount.
- `image`: paste the Amazon product image URL (right-click the image → copy image address). Any https image URL works.
- `amazon_url`: the product's Amazon.in link. Your affiliate tag is added automatically — never paste the tag yourself.
- `category`: any word — `Tech`, `Home`, `Fitness`, or a new one. New categories appear as filter pills on their own.
- `badge`: `""` for none, or e.g. `"Bestseller"`, `"Top Rated"`, `"Editor's Pick"`.
- `rating`: 0–5, one decimal is fine (4.3).
- Wait ~1 minute after committing — GitHub Pages rebuilds and the product appears.

## Remove a product

Open the product's file → **⋯ menu → Delete file** → commit. Gone in a minute.

## Replace your Amazon affiliate tag

1. Open `store/config.js` (pencil icon to edit).
2. Change `"kptimes-21"` to your real tag from Amazon SiteStripe.
3. Commit. Every Buy button updates instantly — you never edit product files for this.

## Tips

- Keep `blurb` to one or two honest lines. It sells more than specs.
- Prefer square-ish product images (Amazon's own images are perfect).
- File names must be unique and end in `.json`.

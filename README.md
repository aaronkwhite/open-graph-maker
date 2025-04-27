# Open Graph Maker

![Ron Swanson OG Image](https://github.com/aaronkwhite/open-graph-maker/blob/main/output/ron-swanson.png?raw=true)

**Dynamic Open Graph social preview images made simple.**

`open-graph-maker` is a Node.js tool for automatically generating Open Graph (OG) images using custom templates, fonts, and dynamic content. It’s flexible enough for blogs, SaaS apps, SEO projects, marketing pages, documentation sites, and more.

---

## ✨ Features

- ⚡ Lightning-fast image generation with Node.js and Canvas
- 🖼️ Dynamic text rendering: titles, taglines, and descriptions
- 🎨 Fully customizable templates, fonts, and styles
- 🛠️ CLI support with `--limit` option for batch control
- 📦 Easy JSON-based content input
- 📂 Outputs high-quality PNG files to a local directory

---

## ⚡ Prerequisites

Before running `open-graph-maker`, make sure you have:

- **Node.js 18.x** or newer installed
- **Required fonts** placed inside the `/fonts` directory
- **A `data.json` file** containing your input data

---

## 📄 Data Format

The `data.json` file must be structured as an array of objects under a `data` key, where each object includes:

- **`title`** (required) — the main heading for the Open Graph image
- **`tagline`** (required) — a short, catchy subheading displayed under the title
- **`description`** (required) — a longer supporting description typically shown smaller

### Example `data.json`

```json
{
  "data": [
    {
      "title": "Ron Swanson",
      "tagline": "Give me all the bacon and eggs you have. And a glass of Scotch.",
      "description": "Director of the Parks Department. Lover of woodworking, whiskey, and freedom."
    },
    {
      "title": "Leslie Knope",
      "tagline": "Friends, waffles, and work. But work has to come third.",
      "description": "Deputy Director of Parks and Recreation. Binder enthusiast and eternal optimist."
    },
    {
      "title": "Andy Dwyer",
      "tagline": "Burt Macklin, FBI!",
      "description": "Shoeshiner, rockstar, and part-time secret agent. Lead singer of Mouse Rat."
    }
  ]
}
```

> **Important:**  
> All three fields — `title`, `tagline`, and `description` — are **required** for each item.

---

### 🎨 Customizing Content

You can easily modify what appears on each Open Graph image by editing the values inside your `data.json` file.

- **Update the `title`** to change the main headline.
- **Change the `tagline`** for a different subheadline or style.
- **Edit the `description`** to add supporting context, character bios, product blurbs, quotes, or anything else.
- **Add or remove entries** to control how many images are generated.

Every time you update `data.json`, simply re-run the script to generate fresh images:

```bash
node generate-og-images.js
```

---

## 📥 Installation

```bash
git clone <repository-url>
cd open-graph-maker
npm install
```

---

## 🚀 Usage

### Generate All OG Images

```bash
node generate-og-images.js
```

### Generate Only N Images (example: 5)

```bash
node generate-og-images.js --limit 5
```

---

## 📂 Project Structure

```
open-graph-maker/
├── fonts/                      # Required font files
├── output/                     # Output directory for generated images
├── generate-og-images.js       # Main generation script
├── data.json                   # Your input data
├── template.png                # Background template image
├── package.json                # Project dependencies
└── README.md                   # This file
```

---

## 🎨 Customization Options

- **Template Image** — Replace `template.png` with your own background image.
- **Fonts** — Place new `.ttf` or `.otf` files in `/fonts` and update the font settings inside `generate-og-images.js`.
- **Layout / Colors** — Adjust text positions, colors, and sizes directly in the script.

---

## 🛡 License

MIT License.  
See [LICENSE](./LICENSE) for full details.

---

## ✨ Credits

Created by [Aaron K. White](https://github.com/aaronkwhite).  
PRs, forks, stars, and collaborations are welcome! 🚀

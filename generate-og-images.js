// scripts/generate-og-images.js

// Add at the top with other requires
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Add before the main function
const argv = yargs(hideBin(process.argv))
    .option('limit', {
      alias: 'l',
      description: 'Limit the number of images to generate',
      type: 'number',
    })
    .help()
    .alias('help', 'h')
    .argv;

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');

// Load patterns data
const jsonData = require('./data.json');
const items = jsonData.data;

// Validate that we have data to process
if (!items || !Array.isArray(items) || items.length === 0) {
  console.error('Error: No valid data found in data.json');
  process.exit(1);
}

// Ensure each item has the required fields and add a slug
const processedItems = items.map((item, index) => {
  if (!item.title || !item.tagline || !item.description) {
    console.warn(`Warning: Item at index ${index} is missing required fields. Skipping.`);
    return null;
  }

  // Generate a slug from the title for the filename
  const slug = item.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')    // Remove special characters
      .replace(/\s+/g, '-');      // Replace spaces with hyphens

  return { ...item, slug };
}).filter(Boolean); // Remove any null items


// Register fonts
// Update your font registration to explicitly support variable font
registerFont(path.join(__dirname, './fonts/SofiaSansCondensed-ExtraBoldItalic.ttf'),
    { family: 'SofiaSansCondensed-ExtraBold', style: 'italic' });

registerFont(path.join(__dirname, './fonts/Inter-MediumItalic.otf'),
    { family: 'InterMedium', style: 'italic' });

registerFont(path.join(__dirname, './fonts/Inter-Regular.otf'),
    { family: 'Inter' });

// Helper function to truncate text with ellipsis
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Helper function to wrap text to multiple lines
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return 0;

  const words = text.split(' ');
  let line = '';
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }

  lines.push(line);

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + (i * lineHeight));
  }

  return lines.length * lineHeight;
}
async function generateOGImage(item) {
  // Create canvas
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  try {
    // Load template image
    const baseImage = await loadImage('./open-graph-maker-template.png');
    ctx.drawImage(baseImage, 0, 0, 1200, 630);

    // Add item title
    ctx.font = 'italic 68px "SofiaSansCondensed-ExtraBold"';
    ctx.fillStyle = '#282725';
    ctx.textAlign = 'left';
    wrapText(ctx, item.title, 80, 400, 900, 90);

    // Add tagline
    ctx.font = 'italic 32px "InterMedium"';
    ctx.fillText(item.tagline, 80, 470);

    // Add truncated description
    const truncatedDesc = truncateText(item.description, 160);
    ctx.font = '20px "Inter"';
    wrapText(ctx, truncatedDesc, 80, 530, 900, 32);

    // Save to output folder
    const buffer = canvas.toBuffer('image/png');
    const outputDir = path.join(__dirname, './output');

    // Ensure directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Write file
    const outputPath = path.join(outputDir, `${item.slug}.png`);
    fs.writeFileSync(outputPath, buffer);

    console.log(`Generated OG image for ${item.title}`);
    return outputPath;
  } catch (error) {
    console.error(`Error generating OG image for ${item.title}:`, error.message);
    return null;
  }
}

async function main() {
  // Get the limit from command line or use all items
  const limit = argv.limit || processedItems.length;
  const itemsToProcess = processedItems.slice(0, limit);

  console.log(`Generating OG images for ${itemsToProcess.length} items (out of ${processedItems.length} total)...`);
  const generatedImages = [];

  for (const item of itemsToProcess) {
    const imagePath = await generateOGImage(item);
    if (imagePath) {
      generatedImages.push({
        title: item.title,
        path: imagePath
      });
    }
  }

  console.log('OG image generation complete!');
  console.log(`Generated ${generatedImages.length} images out of ${itemsToProcess.length} items`);
}

// Call the main function
main().catch(error => console.error('Error:', error));
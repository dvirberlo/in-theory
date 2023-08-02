const svg2png = require("svg2png");
const { readFile, writeFile } = require("fs/promises");

const logoDir = "./src/assets/logo";
const logoSvg = `${logoDir}/logo.svg`;
const sizes = [16, 32, 48, 64, 128, 180, 192, 256, 512, 1024];

/**
 * Generates the logo at a given size.
 * @param {string} svg - The SVG to generate the logo from.
 * @param {number} size - The size of the logo.
 * @returns {Promise<void>}
 */
async function generateLogo(svg, size) {
  console.log(`Generating logo ${size}x${size}...`);
  const png = await svg2png(svg, { width: size, height: size });
  await writeFile(`${logoDir}/logo-${size}.png`, png);
}

const main = async () => {
  console.log("Generating logos...");
  try {
    const svg = await readFile(logoSvg);
    for (const size of sizes) {
      await generateLogo(svg, size);
    }
    console.log("Logos generated successfully!");
  } catch (err) {
    console.error("Error generating logos:", err);
  }
};

main();

// using deno:
/*
import json from "https://github.com/FortAwesome/Font-Awesome/blob/master/metadata/icons.json?raw=true" assert { type: "json" };
const list = [];
Object.keys(json).forEach((ic) =>
  Object.keys(json[ic].svg).forEach((t) => list.push(`fa${t[0]} fa-${ic}`))
);
await Deno.writeTextFile(
  "./src/app/components/lib/icons/awesomeIconType.ts",
  `export type AwesomeIconType = (typeof fontAwesomeList)[number];\n
export const fontAwesomeList = ${JSON.stringify(list, null, 2)} as const;`
);
console.log("Done");
*/
// using node:
(async function () {
  const json = await (
    await fetch(
      "https://github.com/FortAwesome/Font-Awesome/blob/master/metadata/icons.json?raw=true"
    )
  ).json();
  const list = [];
  Object.keys(json).forEach((ic) =>
    Object.keys(json[ic].svg).forEach((t) => list.push(`fa${t[0]} fa-${ic}`))
  );
  require("fs").writeFileSync(
    "./src/app/components/lib/icons/awesomeIconType.ts",
    `export type AwesomeIconType = (typeof fontAwesomeList)[number];\n
export const fontAwesomeList = ${JSON.stringify(list, null, 2)} as const;`
  );
  console.log("Done");
})();

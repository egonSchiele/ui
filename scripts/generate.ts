import vgroup from "@templates/vgroup.js";
import hgroup from "@templates/hgroup.js";
import * as fs from "fs";
const sizes = [
  { size: "XS", sizeClass: "gap-xs" },
  { size: "SM", sizeClass: "gap-sm" },
  { size: "MD", sizeClass: "gap-md" },
  { size: "LG", sizeClass: "gap-lg" },
  { size: "XL", sizeClass: "gap-xl" },
];

function writeFile(filePath: string, content: string) {
  // Write the content to the file
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`Error writing file ${filePath}:`, err);
    } else {
      console.log(`File ${filePath} created successfully.`);
    }
  });
}

sizes.forEach(({ size, sizeClass }) => {
  const fileName = `vgroup${size}.tsx`;
  const content = vgroup({ size, sizeClass });
  const filePath = `./lib/components/ui/layout/${fileName}`;
  writeFile(filePath, content);

  const hgroupFileName = `hgroup${size}.tsx`;
  const hgroupContent = hgroup({ size, sizeClass });
  const hgroupFilePath = `./lib/components/ui/layout/${hgroupFileName}`;
  writeFile(hgroupFilePath, hgroupContent);
});

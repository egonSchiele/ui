import vgroup from "./templates/vgroup.js";
import * as fs from "fs";
const sizes = [
  { size: "XS", sizeClass: "gap-xs" },
  { size: "SM", sizeClass: "gap-sm" },
  { size: "MD", sizeClass: "gap-md" },
  { size: "LG", sizeClass: "gap-lg" },
  { size: "XL", sizeClass: "gap-xl" },
];

sizes.forEach(({ size, sizeClass }) => {
  const fileName = `vgroup${size}.js`;
  const content = vgroup({ size, sizeClass });
  const filePath = `./lib/components/ui/layout/${fileName}`;

  // Write the content to the file
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
    } else {
      console.log(`File ${fileName} created successfully.`);
    }
  });
});

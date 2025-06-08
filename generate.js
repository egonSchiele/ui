"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vgroup_js_1 = require("./templates/vgroup.js");
var fs = require("fs");
var sizes = [
    { size: "XS", sizeClass: "gap-xs" },
    { size: "SM", sizeClass: "gap-sm" },
    { size: "MD", sizeClass: "gap-md" },
    { size: "LG", sizeClass: "gap-lg" },
    { size: "XL", sizeClass: "gap-xl" },
];
sizes.forEach(function (_a) {
    var size = _a.size, sizeClass = _a.sizeClass;
    var fileName = "vgroup".concat(size, ".js");
    var content = (0, vgroup_js_1.default)({ size: size, sizeClass: sizeClass });
    var filePath = "./lib/components/ui/layout/".concat(fileName);
    // Write the content to the file
    fs.writeFile(filePath, content, function (err) {
        if (err) {
            console.error("Error writing file ".concat(fileName, ":"), err);
        }
        else {
            console.log("File ".concat(fileName, " created successfully."));
        }
    });
});

const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const localPath = args[0];

const paths = localPath.split(/\//);
const handle = paths[paths.length - 1];
const directoryPath = path.resolve("src/blocks", localPath);

const words = handle.split("-");
const ComponentName = words
  .map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  })
  .join("");
const componentName = ComponentName[0].toLowerCase() + ComponentName.slice(1);

fs.mkdir(directoryPath, { recursive: true }, function () {
  const indexData = new Uint8Array(
    Buffer.from(`export { default } from "./${handle}"`)
  );
  fs.writeFile(path.resolve(directoryPath, "index.js"), indexData, (err) => {
    if (err) throw err;
    console.log("index file created");
  });

  const componentData = new Uint8Array(
    Buffer.from(
      `import React from "react"\nimport styles from "./${handle}.module.scss"\n\nconst ${ComponentName} = () => {\n return <div>${ComponentName}</div>\n}\n\nexport default ${ComponentName}`
    )
  );
  fs.writeFile(
    path.resolve(directoryPath, `${handle}.js`),
    componentData,
    (err) => {
      if (err) throw err;
      console.log("component file created");
    }
  );

  const styleData = new Uint8Array(Buffer.from(`@import "~scss/imports";\n\n`));
  fs.writeFile(
    path.resolve(directoryPath, `${handle}.module.scss`),
    styleData,
    (err) => {
      if (err) throw err;
      console.log("stylesheet created");
    }
  );

  const queryData = new Uint8Array(
    Buffer.from(
      `import { idtype } from "querypieces";\n\nexport default \`\n...on pageBuilder_${componentName}_BlockType {\n\t\${idtype}\n}\n\``
    )
  );
  fs.writeFile(path.resolve(directoryPath, `query.js`), queryData, (err) => {
    if (err) throw err;
    console.log("query file created");
  });

  const blocksPath = path.resolve("src/blocks/blocks.js");
  fs.readFile(blocksPath, { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;

    const newData = data
      .replace(
        "/* import-cursor */",
        `import ${componentName} from "./${handle}";\n\/* import-cursor *\/`
      )
      .replace(
        "/* object-cursor */",
        `${componentName},\n  \/* object-cursor *\/`
      );

    fs.writeFile(blocksPath, newData, (err) => {
      if (err) throw err;
      console.log("blocks updated");
    });
  });

  const queryPath = path.resolve("src/blocks/query.js");
  fs.readFile(queryPath, { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;

    const newData = data
      .replace(
        "/* import-cursor */",
        `import ${componentName} from "./${handle}/query";\n\/* import-cursor *\/`
      )
      .replace(
        "/* object-cursor */",
        `${componentName},\n  \/* object-cursor *\/`
      );

    fs.writeFile(queryPath, newData, (err) => {
      if (err) throw err;
      console.log("blocks updated");
    });
  });
});

import * as babel from "@babel/core";
import babelPluginSyntaxJSX from "@babel/plugin-syntax-jsx";
import babelPresetTypeScript from "@babel/preset-typescript";
import babelPluginReplaceTsExports from "babel-plugin-replace-ts-export-assignment";
import glob from "fast-glob";
import fs from "fs-extra";
import { exec } from "node:child_process";
import path from "node:path";
import { cwd } from "node:process";
import util from "node:util";
import prettier from "prettier";

const appPath = path.join(cwd(), "/app");
const studioPath = path.join(cwd(), "/studio");

const execPromise = util.promisify(exec);

/** TypeScript removal by Remix (https://github.com/remix-run/remix/blob/43c2f09161a6bb02bee3522e10f3a445320d38b0/packages/remix-dev/cli/useJavascript.ts#L1) */
export let stripTypeScript = async (projectDir) => {
  console.log("Removing TypeScript from", projectDir);

  let remixEnvD = path.join(projectDir, "remix.env.d.ts");
  if (fs.pathExistsSync(remixEnvD)) {
    fs.rmSync(remixEnvD);
  }

  let entries = await glob("**/*.+(ts|tsx)", {
    absolute: true,
    cwd: projectDir === appPath ? path.join(projectDir, "app") : projectDir,
  });
  for (let entry of entries) {
    if (entry.endsWith(".d.ts")) {
      fs.rmSync(entry);
      continue;
    }
    let tsx = await fs.readFile(entry, "utf8");
    let mjs = transpile(tsx, {
      filename: path.basename(entry),
      cwd: projectDir,
    });
    fs.rmSync(entry);
    await fs.writeFile(
      entry.replace(/\.ts$/, ".js").replace(/\.tsx$/, ".jsx"),
      mjs,
      "utf8"
    );
  }

  // remove packages
  await execPromise(
    "npm uninstall typescript @types/node @types/react @types/react-dom @sanity/types @portabletext/types ",
    {
      cwd: projectDir,
    }
  );

  console.log("Finished");
};

export function transpile(tsx, options) {
  let plugins =
    options.cwd === studioPath
      ? [babelPluginSyntaxJSX, babelPluginReplaceTsExports]
      : [babelPluginSyntaxJSX];

  let mjs = babel.transformSync(tsx, {
    compact: false,
    cwd: options.cwd,
    filename: options.filename,
    plugins,
    presets: [
      [babelPresetTypeScript, { jsx: "preserve", allowDeclareFields: true }],
    ],
    retainLines: true,
  });
  if (!mjs || !mjs.code) throw new Error("Could not parse TypeScript");

  /**
   * Babel's `compact` and `retainLines` options are both bad at formatting code.
   * Use Prettier for nicer formatting.
   */
  return prettier.format(mjs.code, { parser: "babel" });
}

await stripTypeScript(appPath);
await stripTypeScript(studioPath);

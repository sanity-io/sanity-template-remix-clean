import { exec } from "node:child_process";
import path from "node:path";
import { cwd } from "node:process";
import util from "node:util";

const studioPath = path.join(cwd(), "/studio");

// remove typescript
const filesToRemove = ["tsconfig.*", "*.ts", "env.d.ts"];

const execPromise = util.promisify(exec);

async function removeTypeScript(folderPath) {
  console.log("Initiated TS removal for ", folderPath);

  try {
    // installs
    await execPromise(
      "npm install && npx tsc && npx prettier --write . && npx eslint --fix",
      {
        cwd: folderPath,
      }
    );

    // remove files
    await execPromise(
      `npx rimraf -g ${filesToRemove.join(
        " "
      )} && npx rimraf -g "!(node_modules)**/**/*.ts" && npm uninstall rimraf typescript @sanity/types @portabletext/types`,
      {
        cwd: folderPath,
      }
    );

    console.log("Finished");
  } catch (error) {
    console.log(error);
  }
}

await removeTypeScript(studioPath);

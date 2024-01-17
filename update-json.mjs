import { readFile, writeFile } from "fs/promises";
import inquirer from "inquirer";

let readPath,
  processPath,
  writePath = "./output/modified.json",
  data,
  updateProcess;

const questions = [
  {
    type: "input",
    default: "./data.json",
    name: "readPath",
    message: "Enter the path to the file that you would like to read:",
  },
  {
    type: "list",
    choices: ["jsonAddSlug"],
    name: "processPath",
    message: "Enter the path to the update module that you would like to use:",
  },
];

await inquirer
  .prompt(questions)
  .then((answers) => {
    readPath = answers.readPath;
    processPath = `./update-processes/${answers.processPath}.mjs`;
  })
  .catch((error) => {
    console.log(error);
  });

try {
  data = JSON.parse(await readFile(readPath, { endcoding: "utf8" }));
  updateProcess = await import(processPath);
} catch (err) {
  console.log(err);
}

const modifiedJSON = JSON.stringify(updateProcess.default(data));

writeFile(writePath, modifiedJSON);

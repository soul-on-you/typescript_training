import { spawn } from "child_process";
import inquirer from "inquirer";

(async function convert() {
  const { result: width } = await inquirer.prompt([
    { type: "number", name: "result", message: "Ширина" },
  ]);

  const { result: height } = await inquirer.prompt([
    { type: "number", name: "result", message: "Высота" },
  ]);

  const { result: path } = await inquirer.prompt([
    { type: "input", name: "result", message: "Путь" },
  ]);

  const { result: name } = await inquirer.prompt([
    { type: "input", name: "result", message: "Название" },
  ]);

  const res = spawn("ffmpeg", [
    "-i",
    path,
    "-c:v",
    "libx264",
    "-s",
    `${width}x${height}`,
    `${path}${name}.mp4`,
  ]);

  res.stdout.on("data", (data: any) => {
    console.log(data.toString());
  });

  res.stderr.on("data", (data: any) => {
    console.log(data.toString());
  });

  res.on("close", () => {
    console.log("done");
  });
})();

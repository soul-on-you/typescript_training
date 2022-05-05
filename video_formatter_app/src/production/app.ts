import { FfmpegExecutor } from "./commands/ffmpeg.executer";
import { PromptService } from "./core/prompt/prompt.service";
import { ConsoleLogger } from "./out/console.logger";

export class App {
  async run() {
    new FfmpegExecutor(ConsoleLogger.getLogger()).execute();
  }
}

const app = new App();
app.run();

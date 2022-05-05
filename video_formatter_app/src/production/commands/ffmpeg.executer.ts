import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecuter } from "../core/executer/command.executer";
import { FileService } from "../core/files/file.service";
import { StreamHandler } from "../core/handlers/stream.handler";
import { IStreamLogger } from "../core/handlers/stream.logger";
import { PromptService } from "../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { IFfmpegCommandExec, IFfmpegInput } from "./ffmpeg.types";

export class FfmpegExecutor extends CommandExecuter<IFfmpegInput> {
  private _fileService: FileService = new FileService();
  private _promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this._promptService.input<number>("Ширина", "number");
    const height = await this._promptService.input<number>("Высота", "number");
    const path = await this._promptService.input<string>(
      "Путь до файла",
      "input"
    );
    const name = await this._promptService.input<string>("Имя", "input");
    console.log({ width, height, path, name });
    return { width, height, path, name };
  }
  protected build({
    width,
    height,
    path,
    name,
  }: IFfmpegInput): IFfmpegCommandExec {
    const output = this._fileService.getFilePath(path, name, "mp4");
    const args = new FfmpegBuilder()
      .input(path)
      .output(output)
      .setVideoSize(width, height)
      .build();
    return { command: "ffmpeg", args, output };
  }
  protected async spawn({
    output,
    command,
    args,
  }: IFfmpegCommandExec): Promise<ChildProcessWithoutNullStreams> {
    await this._fileService.deleteFileIfExists(output);
    return spawn(command, args);
  }
  protected proccessStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}

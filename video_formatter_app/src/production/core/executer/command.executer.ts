import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "../handlers/stream.logger";
import { ICommandExec } from "./command.types";

export abstract class CommandExecuter<Input> {
  constructor(private _logger: IStreamLogger) {}

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = await this.spawn(command);
    this.proccessStream(stream, this._logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommandExec;
  protected abstract spawn(
    command: ICommandExec
  ): Promise<ChildProcessWithoutNullStreams>;
  protected abstract proccessStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void;
}

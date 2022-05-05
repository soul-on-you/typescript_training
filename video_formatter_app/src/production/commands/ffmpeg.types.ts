import { ICommandExec } from "../core/executer/command.types";

export interface IFfmpegInput {
  width: number;
  height: number;
  path: string;
  name: string;
}

export interface IFfmpegCommandExec extends ICommandExec {
  output: string;
}

import { prompt } from "inquirer";
import { TPrompt } from "./prompt.types";

export class PromptService {
  public async input<T>(mes: string, type: TPrompt) {
    const { result } = await prompt<{result: T}>([
      {
        type,
        name: "result",
        message: mes,
      },
    ]);
    return result;
  }
}

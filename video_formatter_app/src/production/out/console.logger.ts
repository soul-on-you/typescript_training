import { IStreamLogger } from "../core/handlers/stream.logger";

export class ConsoleLogger implements IStreamLogger {
  private static _instance: ConsoleLogger;

  private constructor() {}
  
  static getLogger(): ConsoleLogger {
    if (!ConsoleLogger._instance) {
      ConsoleLogger._instance = new ConsoleLogger();
    }
    return ConsoleLogger._instance;
  }

  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.error(...args);
  }
  end(): void {
    console.error("Done!");
  }
}

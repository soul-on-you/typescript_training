export class FfmpegBuilder {
  private inputPath: string | null = null;
  private outputPath: string | null = null;
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set("-c:v", "libx264");
  }

  input(inputPath: string): this {
    this.inputPath = inputPath;
    return this;
  }

  output(outputPath: string): this {
    this.outputPath = outputPath;
    return this;
  }

  setVideoSize(width: number, height: number): this {
    this.options.set("-s", `${width}x${height}`);
    return this;
  }

  build(): string[] {
    if (this.inputPath && this.outputPath) {
      const args: string[] = ["-i", this.inputPath];

      this.options.forEach((value, key) => {
        args.push(key, value);
      });

      args.push(this.outputPath);

      return args;
    }
    throw new Error("Please descript input and output paths");
  }
}

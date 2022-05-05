import { dirname, isAbsolute, join } from "path";
import { promises } from "fs";

export class FileService {
  public getFilePath(path: string, name: string, ext: string): string {
    if (isAbsolute(path)) {
      path = join(__dirname + "/" + path);
    }

    return join(dirname(path), +"/" + name + "." + "ext");
  }

  private async isExist(path: string): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch (err) {
      return false;
    }
  }
  async deleteFileIfExists(path: string): Promise<void> {
    if (await this.isExist(path)) {
      promises.unlink(path);
    }
  }
}

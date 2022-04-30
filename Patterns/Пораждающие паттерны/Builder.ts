enum ImageFormat {
  png = "png",
  jpeg = "jpeg",
}

interface IResolution {
  width: number;
  height: number;
}

interface IImageConversion extends IResolution {
  format: ImageFormat;
}

class ImageBuilder {
  private _formats: ImageFormat[] = [];
  private _resolutions: { height: number; width: number }[] = [];

  addPng() {
    if (!this._formats.includes(ImageFormat.png))
      this._formats.push(ImageFormat.png);
    return this;
  }

  addJpeg() {
    if (!this._formats.includes(ImageFormat.jpeg))
      this._formats.push(ImageFormat.jpeg);
    return this;
  }
  addResolutions(height: number, width: number) {
    this._resolutions.push({ height, width });
    return this;
  }
  build(): IImageConversion[] {
    const res: IImageConversion[] = [];
    for (const format of this._formats) {
      for (const resolution of this._resolutions) {
        res.push({ format, ...resolution });
      }
    }

    return res;
  }
}

const RenderedImageOutfiles = new ImageBuilder()
  .addJpeg()
  .addPng()
  .addResolutions(400, 800)
  .addResolutions(600, 600)
  .addResolutions(1200, 3600)
  .build();

console.log(RenderedImageOutfiles);

/**
 * [
 *   { format: 'jpeg', height: 400, width: 800 },
 *   { format: 'jpeg', height: 600, width: 600 },
 *   { format: 'jpeg', height: 1200, width: 3600 },
 *   { format: 'png', height: 400, width: 800 },
 *   { format: 'png', height: 600, width: 600 },
 *   { format: 'png', height: 1200, width: 3600 }
 * ]
 */
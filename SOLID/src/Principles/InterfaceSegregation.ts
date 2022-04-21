//* interface CloudProvider {
//*   createVM(): void;
//*   connectVM(): void;
//*   createPostgresDB(): void;
//*   createMongoDB(): void;
//*   createMySQL(): void;
//*   generatePackegeCDN(): void;
//*   saveFilesToStorage(): void;
//*   loadFilesFromStorage(): void;
//* }

interface CloudComputeProvider {
  createVM(): void;
  connectVM(): void;
}

interface CloudDBProvider {
  createPostgresDB(): void;
  createMongoDB(): void;
  createMySQL(): void;
}

interface CDNPackegeProvider {
  generatePackegeCDN(): void;
}

interface CloudStorageProvider {
  saveFilesToStorage(): void;
  loadFilesFromStorage(): void;
}

class YandexCloud
  /* CloudProvider */
  implements
    CloudComputeProvider,
    CloudDBProvider,
    CDNPackegeProvider,
    CloudStorageProvider
{
  createVM() {
    console.log("YandexCloud: createVM");
  }
  connectVM() {
    console.log("YandexCloud: connectVM");
  }
  createPostgresDB() {
    console.log("YandexCloud: createPostgresDB");
  }
  createMongoDB() {
    console.log("YandexCloud: createMongoDB");
  }
  createMySQL() {
    console.log("YandexCloud: createMySQL");
  }
  generatePackegeCDN() {
    console.log("YandexCloud: generatePackegeCDN");
  }
  saveFilesToStorage() {
    console.log("YandexCloud: saveFilesToStorage");
  }
  loadFilesFromStorage() {
    console.log("YandexCloud: loadFilesFromStorage");
  }
}

class GoogleDrive
  /* CloudProvider */
  implements CloudStorageProvider
{
  //* createVM() {
  //*   throw new Error("YandexCloud: createVM");
  //* }
  //* connectVM() {
  //*   throw new Error("YandexCloud: connectVM");
  //* }
  //* createPostgresDB() {
  //*   throw new Error("YandexCloud: createPostgresDB");
  //* }
  //* createMongoDB() {
  //*   throw new Error("YandexCloud: createMongoDB");
  //* }
  //* createMySQL() {
  //*   throw new Error("YandexCloud: createMySQL");
  //* }
  //* generatePackegeCDN() {
  //*   throw new Error("YandexCloud: generatePackegeCDN");
  //* }
  saveFilesToStorage() {
    console.log("GoogleDrive: saveFilesToStorage");
  }
  loadFilesFromStorage() {
    console.log("GoogleDrive: loadFilesFromStorage");
  }
}

export default function (): void {
  //* const clouds: CloudProvider[] = [];

  //* clouds.push(new YandexCloud());
  //* clouds.push(new GoogleDrive());

  //* for(const cloud of clouds) {
  //*   cloud.createVM();
  //*   cloud.connectVM();
  //*   cloud.createPostgresDB();
  //*   cloud.saveFilesToStorage();
  //* }

  const cloudStorages: CloudStorageProvider[] = [];
  const superClouds: CloudComputeProvider[] &
    CloudDBProvider[] &
    CDNPackegeProvider[] &
    CloudStorageProvider[] = [];

  cloudStorages.push(new GoogleDrive());
  cloudStorages.push(new YandexCloud());

  superClouds.push(new YandexCloud());

  console.log("\nStorageCloudProviders:");

  for (const storageAPIServise of cloudStorages) {
    storageAPIServise.loadFilesFromStorage();
    storageAPIServise.saveFilesToStorage();
  }

  console.log("\nSuperCloudProviders:");

  for (const cloud of superClouds) {
    cloud.createVM();
    cloud.connectVM();
    cloud.createPostgresDB();
    cloud.saveFilesToStorage();
  }
}

function hello(): void {
  console.log("Hello TypeScript");
}

let message: () => void = hello;
export default message;

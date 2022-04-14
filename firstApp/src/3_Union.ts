export default function (): void {
  let id: number | string;
  id = "1345dgg5";
  console.log(id); // 1345dgg5
  id = 234;
  console.log(id); // 234

  function printSentence(words: string[] | string) {
    // если words - строка
    if (typeof words === "string") {
      console.log(words);
    } else {
      // Если words - массив string[]
      console.log(words.join(" "));
    }
  }
  printSentence(["Язык", "программирования", "TypeScript"]);
  printSentence("Язык программирования JavaScript");
}

export default function (): void {
  enum Season {
    Winter,
    Spring,
    Summer,
    Autumn,
  }
  let current: Season = Season.Summer;
  console.log(current); // 2
  current = Season.Autumn; // изменение значения

  ////////////////////////////////////////////////////////////////

  enum Season2 {
    Winter = 4,
    Spring = 8,
    Summer = 16,
    Autumn = 32,
  } // 4, 8, 16, 32
  var current2: string = Season2[16]; // 16 - числовое значение Summer
  console.log(current2); // Summer
  console.log(Season2.Summer); // 16

  ////////////////////////////////////////////////////////////////

  enum Season3 {
    Winter = "Зима",
    Spring = "Весна",
    Summer = "Лето",
    Autumn = "Осень",
  }
  var current3: Season3 = Season3.Summer;
  console.log(current3); // Лето

  ////////////////////////////////////////////////////////////////

  enum Season4 {
    Winter = 1,
    Spring = "Весна",
    Summer = 3,
    Autumn = "Осень",
  }
  var current4: Season4 = Season4.Summer;
  console.log(current4); // 3
  console.log(Season4.Autumn); // Осень

  ////////////////////////////////////////////////////////////////

  enum DayTime {
    Morning,
    Evening,
  }
  function welcome(dayTime: DayTime) {
    if (dayTime === DayTime.Morning) {
      console.log("Доброе утро");
    } else {
      console.log("Добрый вечер");
    }
  }
  let current5: DayTime = DayTime.Morning;
  welcome(current5); // Доброе утро
  welcome(DayTime.Evening); // Добрый вечер
  welcome(1); // Добрый вечер

  ////////////////////////////////////////////////////////////////

  enum DayTimeMessage {
    Morning = "Доброе утро",
    Evening = "Добрый вечер",
  }
  function welcome2(message: DayTimeMessage) {
    console.log(message);
  }
  let mes: DayTimeMessage = DayTimeMessage.Morning;
  welcome2(mes); // Доброе утро
  welcome2(DayTimeMessage.Evening); // Добрый вечер
  //   welcome2("Привет, ты спишь?");

  function welcome3(message: string) {
    console.log(message);
  }

  welcome3(mes); // Доброе утро
  welcome3(DayTimeMessage.Evening); // Добрый вечер
  welcome3("Привет, ты спишь?");

  ////////////////////////////////////////////////////////////////
}

interface IForm {
  name: string;
  password: string;
  email: string;
}

const form: IForm = {
  name: "Vova",
  password: "32v56n7yacsvdfkjnh",
  email: "123@vskdlfklsdfk",
};

//ПРИМЕР ОТВЕТА ВАЛИДАЦИИ
// const formValidation = {
//   name: { isValid: true },
//   password: {
//     isValid: false,
//     errorMessage: "Должен быть длиннее 4 и короче 10",
//   },
// };

//! МОЕ РЕШЕНИЕ
interface IValidSuccess {
  isValid: true;
}

interface IValidDataFail {
  isValid: false;
  errorMessage: string;
}

type TValidSuccess = IValidSuccess | IValidDataFail;

type TFormValidation<TForm> = {
  [prop in keyof TForm]-?: TValidSuccess;
};

const formValid: TFormValidation<IForm> = {
  name: {
    isValid: true,
  },
  password: {
    isValid: false,
    errorMessage: "Должен быть длиннее 4 и короче 10",
  },
  email: { isValid: false, errorMessage: "Некорректный имейл" },
};

//! ОТВЕТ

type Validation<T> = {
  [K in keyof T]: { isValid: true } | { isValid: false; errorMessage: string };
};

const formValid12: Validation<IForm> = {
  name: { isValid: true },
  password: { errorMessage: "НЕВАЛИД", isValid: false },
  email: { isValid: true },
};

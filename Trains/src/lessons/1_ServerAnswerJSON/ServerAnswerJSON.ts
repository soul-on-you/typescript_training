interface IServerCall {
  sum: number;
  from: number;
  to: number;
}

interface IServerResponse {
  status: "success" | "failed";
  data: IServerOkResponse | IServerErrorResponse;
}

interface IServerOkResponse extends IServerCall {
  transferID: number;
}

interface IServerErrorResponse {
  errorMessage: string;
  errorCode: number;
}

// TEST
const call: IServerCall = {
  sum: 200,
  from: 2,
  to: 4,
};

const okResponse: IServerResponse = {
  status: "success",
  data: { transferID: 567, ...call },
};

const errorResponse: IServerResponse = {
  status: "failed",
  data: { errorMessage: "Недостаточно средств", errorCode: 4 },
};

console.log("\nCALL:");
console.log(call);

console.log("\nOK:");
console.log(okResponse);

console.log("\nERROR:");
console.log(errorResponse);

//!РЕШЕНИЕ

interface IPayment {
  sum: number;
  from: number;
  to: number;
}

interface IPaymentRequest extends IPayment {}

enum PaymentStatus {
  Success = "success",
  Failed = "failed",
}

interface IDataSuccess extends IPaymentRequest {
  transferID: number;
}

interface IDataFailed {
  errorMessage: string;
  errorCode: number;
}

interface IResponseSuccess {
  status: PaymentStatus.Success;
  data: IDataSuccess;
}

interface IResponseFailed {
  status: PaymentStatus.Failed;
  data: IDataFailed;
}

type TResponse = IResponseSuccess | IResponseFailed;

// TEST
const call2: IPaymentRequest = {
  sum: 400,
  from: 4,
  to: 2,
};

const okResponse2: TResponse = {
  status: PaymentStatus.Success,
  data: {
    transferID: 588,
    ...call2,
  },
};

const errorResponse2: TResponse = {
  status: PaymentStatus.Failed,
  data: { errorCode: 4, errorMessage: "Недостаточно средств" },
};

console.log("\nCALL:");
console.log(call2);

console.log("\nOK:");
console.log(okResponse2);

console.log("\nERROR:");
console.log(errorResponse2);

// Задача 2 на typeguard

type TResp = IResponseSuccess | IResponseFailed;
type f = (res: TResp) => number;

function isSuccessResponse(res: TResp): res is IResponseSuccess {
  return res.status === PaymentStatus.Success;
}

function isFailedResponse(res: TResp): res is IResponseFailed {
  return (res as IResponseFailed).data.errorMessage !== undefined;
}

const getIdFromData: f = function (mres) {
  // ВАРИАНТ 1
  if (isSuccessResponse(mres)) {
    return mres.data.transferID;
  }
  return mres.data.errorCode;

  // ВАРИАНТ 2
  // if (isFailedResponse(mres)) {
  //   return mres.data.errorCode;
  // }
  // return mres.data.transferID;
};

console.log("\nTYPE GUARD:");
console.log(getIdFromData(okResponse2));
console.log(getIdFromData(errorResponse2));

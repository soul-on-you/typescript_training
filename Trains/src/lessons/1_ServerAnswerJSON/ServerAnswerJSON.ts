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

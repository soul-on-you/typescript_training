interface IInsurance {
  id: number;
  status: string;
  setVehicle(vehicle: any): void;
  submit(): Promise<boolean>;
}

abstract class InsuranceFactorty {
  db: any;
  abstract createInsuranse(): IInsurance;

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status);
  }
}

class TFInsuranceFactory extends InsuranceFactorty {
  createInsuranse(): TFInsurance {
    return new TFInsurance();
  }
}

//! ВАРИАНТ 2

class TFInsurance implements IInsurance {
  id: number;
  status: string;

  private _vehicle: any;

  setVehicle(vehicle: any): void {
    this._vehicle = vehicle;
  }
  async submit(): Promise<boolean> {
    const res = await fetch("", {
      method: "POST",
      body: JSON.stringify(this._vehicle),
    });
    const data = await res.json();
    return data.isSuccessResponse;
  }
}

class ABInsurance implements IInsurance {
  id: number;
  status: string;

  private _vehicle: any;

  setVehicle(vehicle: any): void {
    this._vehicle = vehicle;
  }
  async submit(): Promise<boolean> {
    const res = await fetch("", {
      method: "POST",
      body: JSON.stringify(this._vehicle),
    });
    const data = await res.json();
    return data.yes;
  }
}

class ABInsuranceFactory extends InsuranceFactorty {
  createInsuranse(): ABInsurance {
    return new ABInsurance();
  }
}

const tfInsuranceFactory = new TFInsuranceFactory();
const tfInsurance = tfInsuranceFactory.createInsuranse();
tfInsuranceFactory.saveHistory(tfInsurance);

//! ВАРИАНТ 2, если фабрики по структуре не меняются, а меняется только сам объект
const INSURANCE_FACTORTY_TYPE = {
  tf: TFInsurance,
  ab: ABInsurance,
};

type IFT = typeof INSURANCE_FACTORTY_TYPE;

class InsuranceFactortyALT {
  db: any;
  createInsuranse<T extends keyof IFT>(type: T): IFT[T] {
    return INSURANCE_FACTORTY_TYPE[type];
  }

  saveHistory(ins: IInsurance) {
    this.db.save(ins.id, ins.status);
  }
}

const insuranceFactortyALT = new InsuranceFactortyALT();
const tfInsuranceALT = new (insuranceFactortyALT.createInsuranse("tf"))();
insuranceFactortyALT.saveHistory(tfInsuranceALT);

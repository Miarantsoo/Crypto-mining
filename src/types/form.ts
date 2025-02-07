export interface IResult {
  nom: string;
  valeur: number;
}

export interface TypeAnalyse {
  value: string;
  display: string;
}

export interface VerificationId {
  id: {
    data: number;
    message: string;
  };
}

export interface SignupRetour {
  id: {
    type: string;
    message: string;
  };
}
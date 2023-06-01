export type Entree = {
  numBondeEntree: number;
  numProduit: number;
  qteEntree: number;
  dateEntree: Date;
  produit: {
    numProduit: number;
    design: string;
    stock: number;
  };
};

export type EntreeProduit = [
  {
    numBondeEntree: number;
    numProduit: number;
    qteEntree: number;
    dateEntree: Date;
  },
  {
    numProduit: number;
    design: string;
    stock: number;
  },
];

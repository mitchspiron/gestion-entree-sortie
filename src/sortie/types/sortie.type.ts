export type Sortie = {
  numBondeSortie: number;
  numProduit: number;
  qteSortie: number;
  dateSortie: Date;
  produit: {
    numProduit: number;
    design: string;
    stock: number;
  };
};

export type SortieProduit = [
  {
    numBondeSortie: number;
    numProduit: number;
    qteSortie: number;
    dateSortie: Date;
  },
  {
    numProduit: number;
    design: string;
    stock: number;
  },
];

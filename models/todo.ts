export interface ITodoOption {
  id: string;
  description: string;
  isChecked: boolean;
}

export interface ITodoCard {
  id: string;
  title: string;
  description: string;
  options: ITodoOption[];
}

export interface ITodoBoard {
  id: string;
  title: string;
  cardIds: string[];
}

export interface ITodo {
  cards: {
    [key in string]: ITodoCard;
  };
  boards: {
    [key in string]: ITodoBoard;
  };
  // Facilitate reordering of the columns
  boardOrder: string[];
}

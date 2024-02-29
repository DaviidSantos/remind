interface INote {
  id: number;
  path: string;
  due_date: string;
  interval: number;
  repetition: number;
  efactor: number;
  is_favorite: number;
  card_id?: number;
}

interface ICard {
  id: number;
  name: string;
}

interface IReference {
  id: number;
  note_id: number;
  reference: string;
}

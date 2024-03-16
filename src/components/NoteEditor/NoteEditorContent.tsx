import {
  PiBookmarkSimple,
  PiBookmarkSimpleFill,
  PiTagSimpleLight,
} from "react-icons/pi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { useOpenNotesContext } from "../../context/OpenNotesContext";
import NoteEditorOption from "./NoteEditorOption";
import NoteEditorOptions from "./NoteEditorOptions";
import NoteEditor from "./NoteEditor";
import Popover from "../Popover/Popover";
import PopoverTrigger from "../Popover/PopoverTrigger";
import PopoverContent from "../Popover/PopoverContent";
import AddTag from "./TagsPopover/AddTag";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { getNodeName } from "../../lib/utils";
import SelectCards from "../SelectCard/SelectCard";

const NoteEditorContent = () => {
  const { openNotes, activeNote } = useOpenNotesContext();
  const [note, setNote] = useState<INote | undefined>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [cards, setCards] = useState<ICard[]>([
    { id: 0, name: "Selecionar coleção..." },
  ]);
  const [currentCard, setCurrentCard] = useState<ICard>();

  const selectNote = async function () {
    const data = await invoke<INote>("select_note", {
      path: activeNote.replace(".md", ""),
    });

    console.log(data);

    if (data.card_id) {
      const card = await invoke<ICard>("select_card", { id: data.card_id });
      setCurrentCard(card);
    } else {
      setCurrentCard({ id: 0, name: "Selecionar coleção..." });
    }

    if (data.is_favorite === 1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }

    setNote(data);
  };

  const loadCards = async () => {
    const cards_db: ICard[] = await invoke<ICard[]>("select_all_cards");
    setCards([...cards, ...cards_db]);
  };

  const changeCard = async (card: ICard) => {
    console.log(activeNote);
    await invoke("update_note_card", { noteId: note?.id, cardId: card.id });
    setCurrentCard(card);
  };

  const updateFavorite = async () => {
    const favorite = isFavorite === true ? 0 : 1;

    setIsFavorite(!isFavorite);
    await invoke("update_favorite", { id: note?.id, isFavorite: favorite });
  };

  useEffect(() => {
    selectNote();
    loadCards();
  }, [activeNote]);

  return (
    <div className="w-full py-4">
      <h2 className="text-2xl text-zinc-200 font-bold max-w-[calc(100vw-370px)] mx-auto">
        {getNodeName(
          openNotes
            .find((note) => note.title === activeNote)
            ?.title.replace(".md", "")!
        )}
      </h2>

      <NoteEditorOptions>
        <Popover>
          <PopoverTrigger>
            <NoteEditorOption>
              <PiTagSimpleLight className="h-4 text-zinc-200 group-hover:text-zinc-400" />
              <span className="text-xs text-zinc-200 group-hover:text-zinc-400">
                Tags
              </span>
              <PopoverContent classNames="top-6">
                {note && <AddTag note={note} selectNote={selectNote}/>}
              </PopoverContent>
            </NoteEditorOption>
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <NoteEditorOption>
              <MdOutlineCollectionsBookmark className="h-4 text-zinc-200 group-hover:text-zinc-400" />
              <span className="text-xs text-zinc-200 group-hover:text-zinc-400">
                Coleção
              </span>
              <PopoverContent classNames="top-6">
                <SelectCards
                  options={cards}
                  action={changeCard}
                  currentCard={currentCard!}
                />
              </PopoverContent>
            </NoteEditorOption>
          </PopoverTrigger>
        </Popover>

        <NoteEditorOption>
          <button className="flex items-center gap-1" onClick={updateFavorite}>
            {isFavorite ? (
              <PiBookmarkSimpleFill />
            ) : (
              <PiBookmarkSimple className="h-4 text-zinc-200 group-hover:text-zinc-400" />
            )}

            <span className="text-xs text-zinc-200 group-hover:text-zinc-400">
              Favorito
            </span>
          </button>
        </NoteEditorOption>
      </NoteEditorOptions>

      {openNotes.map(
        (openNote) =>
          openNote.title === activeNote && (
            <NoteEditor note={openNote} key={`${openNote.title}${note?.id}`} />
          )
      )}
    </div>
  );
};

export default NoteEditorContent;

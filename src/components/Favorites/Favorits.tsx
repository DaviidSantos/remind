import { AiOutlineLeft } from "react-icons/ai";
import { useExplorerContext } from "../../context/ExplorerContext";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import File from "../FileTree/File";

const Favorits = () => {
  const { setExplorerMode } = useExplorerContext();
  const [favorites, setFavorites] = useState<INote[]>();

  const getFavorites = async () => {
    const notes = await invoke<INote[]>("get_favorites");
    console.log(notes);
    setFavorites(notes);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <section className="grow min-h-0 py-4">
      <div className="flex items-center gap-4 mb-5">
        <button onClick={() => setExplorerMode("FILE_TREE")}>
          <AiOutlineLeft className="h-3 text-zinc-400" />
        </button>
        <span className="text-zinc-400 text-xs">Favoritos</span>
      </div>

      {favorites && (
        <div>
          {favorites.map((favorite) => (
            <File
              path={`${favorite.path}.md`}
              key={`${favorite.path}/${favorite.efactor}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorits;

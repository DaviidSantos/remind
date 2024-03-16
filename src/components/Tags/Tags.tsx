import { AiOutlineLeft } from "react-icons/ai";
import { useExplorerContext } from "../../context/ExplorerContext";
import { HiOutlinePlus } from "react-icons/hi2";
import Popover from "../Popover/Popover";
import PopoverContent from "../Popover/PopoverContent";
import PopoverTrigger from "../Popover/PopoverTrigger";
import Tooltip from "../Tooltip";
import CreateTag from "./Action/CreateTag";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";

const Tags = () => {
  const [tags, setTags] = useState<ITag[]>();
  const { setExplorerMode } = useExplorerContext();

  const readTags = async function () {
    const data = await invoke<ITag[]>("select_all_tags");

    setTags(data);
  };

  useEffect(() => {
    readTags();
  }, []);

  return (
    tags && (
      <section className="grow min-h-0 py-3 relative">
        <div className="flex justify-between pb-3 mb-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setExplorerMode("FILE_TREE")}>
              <AiOutlineLeft className="h-3 text-zinc-400 hover:text-zinc-100" />
            </button>
            <h4 className="text-xs font-semibold text-zinc-400">Tags</h4>
          </div>
        </div>

        <div>
          {tags.map((tag) => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>
      </section>
    )
  );
};

export default Tags;

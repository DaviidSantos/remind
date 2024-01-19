import { AiOutlineLeft } from "react-icons/ai";
import { useExplorerContext } from "../../context/ExplorerContext";
import { HiOutlinePlus } from "react-icons/hi2";
import Popover from "../Popover/Popover";
import PopoverContent from "../Popover/PopoverContent";
import PopoverTrigger from "../Popover/PopoverTrigger";
import Tooltip from "../Tooltip";
import CreateTag from "./Action/CreateTag";

const Tags = () => {
  const { setExplorerMode } = useExplorerContext();

  return (
    <section className="grow min-h-0 py-3 relative">
      <div className="flex justify-between pb-3">
        <div className="flex items-center gap-2">
          <button onClick={() => setExplorerMode("FILE_TREE")}>
            <AiOutlineLeft className="h-3 text-zinc-100" />
          </button>
          <h4 className="text-sm font-semibold text-zinc-100">Tags</h4>
        </div>

        <Popover>
          <PopoverTrigger>
            <Tooltip tooltip="Nova anotação">
              <HiOutlinePlus className="h-4 text-zinc-200" />
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent>
            <CreateTag />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
};

export default Tags;

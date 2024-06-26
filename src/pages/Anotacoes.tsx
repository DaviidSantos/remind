import { AiOutlineFolderAdd } from "react-icons/ai";
import {
  PiBookmarkSimple,
  PiNotePencilLight,
  PiTagSimple,
} from "react-icons/pi";
import ExplorerContainer from "../components/Explorer/ExplorerContainer";
import ExplorerOption from "../components/Explorer/ExplorerOption";
import ExplorerOptions from "../components/Explorer/ExplorerOptions";
import Popover from "../components/Popover/Popover";
import PopoverTrigger from "../components/Popover/PopoverTrigger";
import PopoverContent from "../components/Popover/PopoverContent";
import Tooltip from "../components/Tooltip";
import { FileTreeContextProvider } from "../context/FileTreeContext";
import FileTree from "../components/FileTree/FileTree";
import CreateFolder from "../components/Explorer/Action/CreateFolder";
import CreateNote from "../components/Explorer/Action/CreateNote";
import { OpenNotesContextProvider } from "../context/OpenNotesContext";
import NoteEditorContainer from "../components/NoteEditor/NoteEditorContainer";
import NoteEditorTabs from "../components/NoteEditor/Tabs/NoteEditorTabs";
import NoteEditorContent from "../components/NoteEditor/NoteEditorContent";
import { useExplorerContext } from "../context/ExplorerContext";
import Favorits from "../components/Favorites/Favorits";
import Tags from "../components/Tags/Tags";

const Anotacoes = () => {
  const { explorerMode, setExplorerMode } = useExplorerContext();

  const currentView = {
    FILE_TREE: <FileTree />,
    FAVORITS: <Favorits />,
    TAGS: <Tags />,
  }[explorerMode];

  return (
    <div className="flex w-full">
      <OpenNotesContextProvider>
        <FileTreeContextProvider>
          <ExplorerContainer>
            <ExplorerOptions>
              <Tooltip tooltip="Tags">
                <ExplorerOption>
                  <button onClick={() => setExplorerMode("TAGS")}>
                    <PiTagSimple className="h-4 text-zinc-200" />
                  </button>
                </ExplorerOption>
              </Tooltip>

              <Tooltip tooltip="Favoritos">
                <ExplorerOption>
                  <button onClick={() => setExplorerMode("FAVORITS")}>
                    <PiBookmarkSimple className="h-4 text-zinc-200" />
                  </button>
                </ExplorerOption>
              </Tooltip>

              <Popover>
                <PopoverTrigger>
                  <Tooltip tooltip="Nova anotação">
                    <ExplorerOption>
                      <PiNotePencilLight className="h-4 text-zinc-200" />
                    </ExplorerOption>
                  </Tooltip>
                </PopoverTrigger>
                <PopoverContent>
                  <CreateNote />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <Tooltip tooltip="Nova pasta">
                    <ExplorerOption>
                      <AiOutlineFolderAdd className="h-4 text-zinc-200" />
                    </ExplorerOption>
                  </Tooltip>
                </PopoverTrigger>
                <PopoverContent>
                  <CreateFolder />
                </PopoverContent>
              </Popover>
            </ExplorerOptions>

            {currentView}
          </ExplorerContainer>

          <NoteEditorContainer>
            <NoteEditorTabs />
            <NoteEditorContent />
          </NoteEditorContainer>
        </FileTreeContextProvider>
      </OpenNotesContextProvider>
    </div>
  );
};

export default Anotacoes;

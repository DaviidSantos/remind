import { AiOutlineFolderAdd } from "react-icons/ai";
import {
  PiBookmarkSimple,
  PiMagnifyingGlassLight,
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

const Anotacoes = () => {
  const { explorerMode, setExplorerMode } = useExplorerContext();

  const currentView = {
    FILE_TREE: <FileTree />,
    FAVORITS: <Favorits />,
  }[explorerMode];

  return (
    <div className="flex w-full">
      <OpenNotesContextProvider>
        <ExplorerContainer>
          <FileTreeContextProvider>
            <ExplorerOptions>
              <Tooltip tooltip="Pesquisar anotações">
                <ExplorerOption>
                  <PiMagnifyingGlassLight className="h-4 text-zinc-200" />
                </ExplorerOption>
              </Tooltip>

              <Tooltip tooltip="Tags">
                <ExplorerOption>
                  <PiTagSimple className="h-4 text-zinc-200" />
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
          </FileTreeContextProvider>
        </ExplorerContainer>

        <NoteEditorContainer>
          <NoteEditorTabs />
          <NoteEditorContent />
        </NoteEditorContainer>
      </OpenNotesContextProvider>
    </div>
  );
};

export default Anotacoes;

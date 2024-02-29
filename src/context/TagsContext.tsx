import { invoke } from "@tauri-apps/api";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Tag {
  id: number;
  name: string;
}

interface TagsContext {
  tags: Tag[] | undefined;
  setTags: (tags: Tag[]) => void;
  readTags: () => Promise<void>;
}

interface TagsContextProviderProps {
  children: React.ReactNode;
}

const TagsContext = createContext<TagsContext>({
  tags: [],
  setTags: () => {},
  readTags: async () => {},
});

export function useTagsContext() {
  const context = useContext(TagsContext);
  if (!context)
    throw new Error(
      `Context 'Tags Context' is null. Did you use <TagsContextProvider>?`
    );
  return context;
}

export const TagsContextProvider: FC<TagsContextProviderProps> = ({
  children,
}) => {
  const [tags, setTags] = useState<Tag[]>();

  const readTags = async function () {
    const data = await invoke<Tag[]>("select_all_tags");

    console.log(data);
    setTags(data);
  };

  useEffect(() => {
    readTags();
  }, []);

  return (
    <TagsContext.Provider value={{ tags, setTags, readTags }}>
      {children}
    </TagsContext.Provider>
  );
};

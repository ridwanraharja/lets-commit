import { WithContext as ReactTagInput, Tag } from "react-tag-input";
import { Tag as TagIcon } from "lucide-react";

interface TagInputProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export function TagInput({
  tags,
  setTags,
  maxTags = 5,
  placeholder = "Add tags...",
}: TagInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
        <TagIcon className="w-4 h-4 inline mr-1" />
        Tags ({maxTags} tags required) *
      </label>
      <div className="bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-3">
        <ReactTagInput
          tags={tags}
          suggestions={[]}
          delimiters={[188, 13]}
          placeholder={placeholder}
          handleDelete={(i) =>
            setTags(tags.filter((_tag, index) => index !== i))
          }
          handleAddition={(tag) => {
            if (tags.length < maxTags) {
              setTags([...tags, tag]);
            }
          }}
          classNames={{
            tags: "flex flex-wrap gap-2",
            tag: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-lg text-sm flex items-center gap-1",
            tagInput: "flex-1 min-w-0",
            tagInputField:
              "w-full px-3 py-2 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm",
            remove: "text-red-500 hover:text-red-700 cursor-pointer",
            selected: "flex items-center gap-1 flex-wrap",
          }}
        />
      </div>
    </div>
  );
}

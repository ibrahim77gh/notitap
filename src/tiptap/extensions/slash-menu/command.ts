import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export const Commands = Extension.create({
  name: "mention",

  addOptions() {
    return {
      suggestions: {
        char: "/",
        command: ({ editor, range, props }: any) =>
          props.command({ editor, range, props }),
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestions,
      }),
    ];
  },
});

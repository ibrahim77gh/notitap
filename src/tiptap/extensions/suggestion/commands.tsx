import { Extension } from "@tiptap/core";
import { Editor, Range } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";

interface MentionOptions {
  char: string;
  startOfLine: boolean;
  command: (params: { editor: Editor; range: Range; props: MentionProps }) => void;
}

interface MentionProps {
  command: (params: { editor: Editor; range: Range; props: MentionProps }) => void;
}

const Commands = Extension.create({
  name: "mention",

  defaultOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }: { editor: Editor; range: Range; props: MentionProps }) => {
        props.command({ editor, range, props });
      },
    },
  },
});

export default Commands;

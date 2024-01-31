import { AnyExtension, Editor, Extension } from "@tiptap/core";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";

import OrderedList from "@tiptap/extension-ordered-list";
// import OrderedList from "./ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import DropCursor from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";

import { Node as ProsemirrorNode } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

import Collaboration from "@tiptap/extension-collaboration";
import { HocuspocusProvider } from '@hocuspocus/provider'
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

// CodeBlock
import { createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import { TrailingNode } from "./trailingNode";
import { ResizableMedia } from "./resizableMedia";
import { SuperchargedTableExtensions } from "./supercharged-table";
// import { Paragraph } from "./paragraph";
import Paragraph from '@tiptap/extension-paragraph'
import { Link } from "./link";
// import { DBlock } from "./dBlock";
// import { Document } from "./doc";
import Document from '@tiptap/extension-document'
import { FontSize } from "./font-size/font-size";

import Color from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";

import CustomKeymap from "./custom-keymap";
import DragAndDrop from "./drag-and-drop";
import { SmallText } from "./SmallText";
import { Node } from "@tiptap/core";
// import RootBlock from "./root-block/root-block";
// import Keymap from "./root-block/keymap";

// import { BackColor } from "./back-color/back-color";


// import html from "highlight.js/lib/languages/html"


// const Document = Node.create({
//   name: "doc",
//   topNode: true,
//   content: "rootblock+",
// });


export interface PlaceholderOptions {
  emptyEditorClass: string;
  emptyNodeClass: string;
  placeholder:
    | ((PlaceholderProps: {
        editor: Editor;
        node: ProsemirrorNode;
        pos: number;
        hasAnchor: boolean;
      }) => string)
    | string;
  showOnlyWhenEditable: boolean;
  showOnlyCurrent: boolean;
  includeChildren: boolean;
}

export const Placeholder = Extension.create<PlaceholderOptions>({
  name: "placeholder",

  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const active =
              this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations: Decoration[] = [];

            if (!active) {
              return null;
            }

            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              const isEmpty = !node.isLeaf && !node.childCount;

              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                const classes = [this.options.emptyNodeClass];

                if (this.editor.isEmpty) {
                  classes.push(this.options.emptyEditorClass);
                }

                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder":
                    typeof this.options.placeholder === "function"
                      ? this.options.placeholder({
                          editor: this.editor,
                          node,
                          pos,
                          hasAnchor,
                        })
                      : this.options.placeholder,
                });

                decorations.push(decoration);
              }

              return this.options.includeChildren;
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

type Page = {
  id: number;
  title: string;
  content: string | null;
};


interface GetExtensionsProps {
  openLinkModal: () => void;
  page: Page;
}

export const getExtensions = ({
  openLinkModal,
  page,
}: GetExtensionsProps): AnyExtension[] => {
  const lowlight = createLowlight();
  // load all highlight.js languages
  // lowlight.register({html})
  lowlight.register({ css });
  lowlight.register({ javascript });
  lowlight.register({ typescript });

  const newProvider = new HocuspocusProvider({
    // url: 'ws://127.0.0.1:1234/collaboration',
    url: 'ws://24.144.83.75:1234/collaboration',
    name: `${page.title}`,
    token: "super-secret-token",
  })

  return [
    Collaboration.configure({
      document: newProvider.document,
    }),
    DragAndDrop,
    CustomKeymap,
    // CollaborationCursor.configure({
    //   provider,
    //   user: { name: "John Doe", color: "#ffcc00" },
    // }),
    // RootBlock,
    // Keymap,
    // Necessary
    FontSize,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    TextStyle,
    Color.configure({
      types: ['textStyle'],
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Document,
    // DBlock,
    Paragraph,
    SmallText,
    Text,
    DropCursor.configure({
      width: 2,
      class: "notitap-dropcursor",
      color: "skyblue",
    }),
    GapCursor,
    // History,
    HardBreak,

    // marks
    Bold,
    Italic,
    Strike,
    Underline,
    Link.configure({
      autolink: true,
      linkOnPaste: true,
      protocols: ["mailto"],
      openOnClick: false,
      onModKPressed: openLinkModal,
    }),

    // Node
    ListItem,
    BulletList,
    OrderedList.configure({
      keepMarks: false,
    }),
    Heading.configure({
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 'heading-color',
      },
    }),
    // TrailingNode,

    // Table
    ...SuperchargedTableExtensions,

    // Resizable Media
    ResizableMedia.configure({
      uploadFn: async (image) => {
        const fd = new FormData();

        fd.append("file", image);

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/image/`, {
            method: "POST",
            body: fd,
          });

          const filename = await response?.json();
          if (filename) {
            return `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
          }
        } catch {
          // do your thing
        } finally {
          // do your thing
        }
        return "";
      },
    }),

    Placeholder.configure({
      placeholder: "Type `/` for commands",
      includeChildren: true,
    }),
  ];
};
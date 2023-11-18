/* eslint-disable */
import { Editor } from "@tiptap/core";
import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import { debounce } from 'lodash';
import { useCallback, useState } from "react";
import "tippy.js/animations/shift-toward-subtle.css";
// import applyDevTools from "prosemirror-dev-tools";

import { getExtensions } from "./extensions";
// import { CustomBubbleMenu, LinkBubbleMenu } from "./menus";
import { content } from "./mocks";
import { notitapEditorClass } from './proseClassString'

import "./styles/tiptap.scss";

// import 'highlight.js/styles/github-dark.css';
import { BsArrowUpRight } from 'react-icons/bs';
import {
    RxFontBold,
    RxFontItalic,
    RxStrikethrough,
    RxChevronDown,
    RxChatBubble,
    RxCode
} from 'react-icons/rx'
import { BubbleButton } from '../components/BubbleButton';

export const Tiptap = () => {
  const logContent = useCallback(
    (e: Editor) => console.log(e.getJSON()),
    []
  );

  const [isAddingNewLink, setIsAddingNewLink] = useState(false);

  const openLinkModal = () => setIsAddingNewLink(true);

  const closeLinkModal = () => setIsAddingNewLink(false);

  const addImage = () =>
    editor?.commands.setMedia({
      src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
      "media-type": "img",
      alt: "Something else",
      title: "Something",
      width: "800",
      height: "400",
    });

  const videoUrl =
    "https://user-images.githubusercontent.com/45892659/178123048-0257e732-8cc2-466b-8447-1e2b7cd1b5d9.mov";

  const addVideo = () =>
    editor?.commands.setMedia({
      src: videoUrl,
      "media-type": "video",
      alt: "Some Video",
      title: "Some Title Video",
      width: "400",
      height: "400",
    });

  const editor = useEditor({
    extensions: getExtensions({ openLinkModal }),
    content,
    editorProps: {
      attributes: {
        class: `${notitapEditorClass} focus:outline-none w-full`,
        spellcheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    onUpdate: debounce(({ editor: e }) => {
      logContent(e);
    }, 500),
  });

  const addTable = () => editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })


  return (
    <>
      editor && (
        <section className="flex flex-col gap-2 w-full justify-center">
          <span className="flex gap-2">
            <button
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => addImage()}
            >
              Add Image
            </button>
            <button
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => addVideo()}
            >
              Add Video
            </button>
            <button
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => addTable()}
            >
              Add table
            </button>
          </span>

          <EditorContent className="w-full flex justify-center" editor={editor} />

          {/* <CustomBubbleMenu editor={editor} /> */}

          {/* <LinkBubbleMenu editor={editor} /> */}
          
        </section>
      )

      {editor && (
        <FloatingMenu className="bg-white py-2 px-1 shadow-xl border gap-1 border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
            editor={editor}
            shouldShow={({ state }) => {
                const { $from } = state.selection;
                const currentLineText = $from.nodeBefore?.textContent;

                return currentLineText === '/';
            }}
        >
            <button 
                className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
                onClick={() => 
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/text/en-US.png" />
                <div className="flex flex-col text-left">
                    <span className="text-sm">Heading 1</span>
                    <span className="text-xs text-zinc-400">Big section heading</span>
                </div>
            </button>
            <button 
                className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
                onClick={() => 
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/subheader.9aab4769.png" />
                <div className="flex flex-col text-left">
                    <span className="text-sm">Heading 2</span>
                    <span className="text-xs text-zinc-400">Normal section heading.</span>
                </div>
            </button>
            <button 
                className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
                onClick={() => 
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png" />
                <div className="flex flex-col text-left">
                    <span className="text-sm">Heading 3</span>
                    <span className="text-xs text-zinc-400">Small section heading.</span>
                </div>
            </button>
        </FloatingMenu>
    )}

    {/* <EditorContent className="max-w-[700px] mx-auto pt-16 prose prose-blue h-full" editor={editor} /> */}
    
    <style>
        {`
        .ProseMirror::placeholder {
            color: #9CA3AF;
        }
        `}
    </style>

    {editor && (
        <BubbleMenu className="bg-white shadow-xl border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-x-zinc-600"
            editor={editor}
        >

        <BubbleButton>
            Text <RxChevronDown  className="w-4 h-4" />
        </BubbleButton>
        <BubbleButton>
            <BsArrowUpRight className="w-4 h-4" /> Link
        </BubbleButton>
        <BubbleButton>
            <RxChatBubble className="w-4 h-4" /> Comment
        </BubbleButton>
        <div className="flex items-center">
            <BubbleButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-active={editor.isActive('bold')}
            >
                <RxFontBold className="w-4 h-4" /> 
            </BubbleButton>
            <BubbleButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-active={editor.isActive('italic')}
            >
                <RxFontItalic className="w-4 h-4" /> 
            </BubbleButton>
            <BubbleButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                data-active={editor.isActive('strike')}
            >
                <RxStrikethrough className="w-4 h-4" /> 
            </BubbleButton>
            <BubbleButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                data-active={editor.isActive('code')}
            >
                <RxCode className="w-4 h-4" /> 
            </BubbleButton>
        </div>
        </BubbleMenu>
    )}
  </>
  );
};

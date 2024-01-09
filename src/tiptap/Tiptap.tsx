/* eslint-disable */
import { Editor } from "@tiptap/core";
import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import { debounce } from 'lodash';
import { useCallback } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket'
import { useEffect, useState } from 'react';
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
// import { getRandomUser } from './';
import "tippy.js/animations/shift-toward-subtle.css";
// import applyDevTools from "prosemirror-dev-tools";

import { getExtensions } from "./extensions";

import axios from 'axios';
import "./styles/tiptap.scss";
import "highlight.js/styles/github.css";

// import 'highlight.js/styles/github-dark.css';
import { CustomBubbleMenu, LinkBubbleMenu } from "./menus";
import SlashMenu from "@/components/SlashMenu";
import { useDarkMode } from "@/contexts/DarkModeContext";

type Page = {
    id: number;
    title: string;
    content: string | null;
};

export const Tiptap: React.FC<{ page: Page }> = ({ page }) => {

    const pageTitle = page.title
    const [content,setContent]=useState()

    const logContent = useCallback(
        (e: Editor) => console.log(e.getJSON(),'json',e?.getHTML()),
        []
    );
    const [isAddingNewLink, setIsAddingNewLink] = useState(false);

    const openLinkModal = () => setIsAddingNewLink(true);

    const closeLinkModal = () => setIsAddingNewLink(false);

    const { darkMode } = useDarkMode(); 

    const notitapEditorClass = `prose prose-p:my-2 prose-h1:my-2 prose-h2:my-2 prose-h3:my-2 prose-ul:my-2 prose-ol:my-2 max-w-none ${darkMode ? 'text-white' : 'text-black'}`;
    
    const editor = useEditor({
        extensions: getExtensions({ openLinkModal, page,}),
        content,
        editorProps: {
        attributes: {
            class: `${notitapEditorClass} focus:outline-none w-full`,
            spellcheck: "false",
            suppressContentEditableWarning: "true",
        },
        },
        // onUpdate: debounce(({ editor: e }) => {
        //     // setHtmlContent(e?.getHTML())
        //     logContent(e);
        // }, 500),
    });

    useEffect(() => {
        editor?.setOptions({
            editorProps: {
              attributes: {
                class: `${notitapEditorClass} focus:outline-none w-full`,
              },
            },
          })
    }, [darkMode])

    const floatMenuClass = `${darkMode ? 'bg-black' : 'bg-white'} py-2 px-1 shadow-xl border gap-1 border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col`
  return (
    <>
        {/* <CustomBubbleMenu editor={editor} /> */}

        {/* <LinkBubbleMenu editor={editor} /> */}
    {editor && (
        <>
            <FloatingMenu className={floatMenuClass}
                editor={editor}
                shouldShow={({ state }) => {
                    const { $from } = state.selection;
                    const currentLineText = $from.nodeBefore?.textContent;

                    return currentLineText === '/';
                }}
            >
                <SlashMenu editor={editor}/>
            </FloatingMenu>
        </>
    )}

    {/* <EditorContent className="max-w-[700px] mx-auto pt-16 prose prose-blue h-full" editor={editor} /> */}
    <EditorContent className="w-full flex justify-center" editor={editor} />

    <style>
        {`
        .ProseMirror::placeholder {
            color: #9CA3AF;
        }
        `}
    </style>

    {editor && (
        <>
            <CustomBubbleMenu editor={editor} />
            <LinkBubbleMenu editor={editor} />
        </>
    )}
  </>
  );
};
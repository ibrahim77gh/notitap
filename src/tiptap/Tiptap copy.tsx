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
// import { CustomBubbleMenu, LinkBubbleMenu } from "./menus";
import { content } from "./mocks";
import { notitapEditorClass } from './proseClassString'

import "./styles/tiptap.scss";
import "highlight.js/styles/github.css";

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
import { CustomBubbleMenu } from "./menus";
import SlashMenu from "@/components/SlashMenu";

export const Tiptap = () => {
    const doc = new Y.Doc();
    const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const logContent = useCallback(
    (e: Editor) => console.log(e.getJSON()),
    []
  );

  const [isAddingNewLink, setIsAddingNewLink] = useState(false);

  const openLinkModal = () => setIsAddingNewLink(true);

    const closeLinkModal = () => setIsAddingNewLink(false);
    // useEffect(() => {
    //     // Set up the WebsocketProvider
    //     const newProvider = new WebsocketProvider('ws://localhost:1234', 'Page1', doc);
    //     setProvider(newProvider);
    //     newProvider.on('status', (event: { status: any; }) => {
    //         console.log(event.status,'---------') // logs "connected" or "disconnected"
    //     })

    //     // Clean up the provider when the component is unmounted
    //     return () => {
    //       newProvider.disconnect();
    //     };
    //   }, []); // Empty dependency array means this effect runs once, similar to componentDidMount
    

    const editor = useEditor({
        extensions: getExtensions({ openLinkModal, doc,provider}),
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


  return (
    <>
        {/* <CustomBubbleMenu editor={editor} /> */}

        {/* <LinkBubbleMenu editor={editor} /> */}
    {editor && (
        <>
            <FloatingMenu className="bg-white py-2 px-1 shadow-xl border gap-1 border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
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
        <CustomBubbleMenu className="bg-white shadow-xl border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-x-zinc-600"
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
            {/* <BubbleButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                data-active={editor.isActive('code')}
            >
                <RxCode className="w-4 h-4" /> 
            </BubbleButton> */}
        </div>
        </CustomBubbleMenu>
    )}
  </>
  );
};
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
    content: string;
};

export const Tiptap: React.FC<{ page: Page }> = ({ page }) => {

    const pageTitle = page.title
    const [content,setContent]=useState()
    const doc = new Y.Doc();
    const [provider, setProvider] = useState<WebsocketProvider | null>(null);
    const logContent = useCallback(
    (e: Editor) => console.log(e.getJSON(),'json',e?.getHTML()),
    []
  );
    const [htmlContent, setHtmlContent] = useState('<p>Your Editor</p>');
    const [isAddingNewLink, setIsAddingNewLink] = useState(false);

    const openLinkModal = () => setIsAddingNewLink(true);

    const closeLinkModal = () => setIsAddingNewLink(false);

    const { darkMode } = useDarkMode(); 

    const notitapEditorClass = `prose prose-p:my-2 prose-h1:my-2 prose-h2:my-2 prose-h3:my-2 prose-ul:my-2 prose-ol:my-2 max-w-none ${darkMode ? 'text-white' : 'text-black'}`;
    
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
            setHtmlContent(e?.getHTML())
        // logContent(e);
        }, 500),
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


    // '<div data-type="d-block"><p></p></div>'
    useEffect(() => {
        const timer = setTimeout(() => {
            // console.log(editor?.getHTML(), 'editor HTML content after 500 milliseconds');
            if (editor?.getHTML() == '<div data-type="d-block"><p></p></div>') {
                getData()
            }
        }, 500);
        // Cleanup function to clear the timer when the component is unmounted
        return () => clearTimeout(timer);
    },[editor])
    useEffect(() => {
        const saveInterval = setInterval(saveHtmlContent, 30000);
        const newProvider = new WebsocketProvider('ws://localhost:1234', pageTitle, doc);
        setProvider(newProvider);
        newProvider.on('status', (event: { status: any; }) => {
            console.log(event.status,'---------') // logs "connected" or "disconnected"
        })
        return () => {
          clearInterval(saveInterval);
        };
        
    }, [htmlContent]); // Empty dependency array means this effect runs once, similar to componentDidMount
    
    const saveHtmlContent = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/page/save`, { title:pageTitle,content:htmlContent })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error saving HTML content:', error));

      };

    const getData = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/page/${pageTitle}`)
            .then(response => {
                if (response?.data?.content) {
                        editor?.commands.setContent(response?.data?.content);
                  }
            })
            .catch(error => {
              // Handle errors here
              console.error('Error:', error);
            });
    }

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
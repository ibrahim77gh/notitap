import React from 'react'
import { Editor } from '@tiptap/react'
import { CiImageOn } from "react-icons/ci";
import { FaTable } from "react-icons/fa";

const SlashMenu = ({ editor }: { editor: Editor }) => {
    const videoUrl = "https://user-images.githubusercontent.com/45892659/178123048-0257e732-8cc2-466b-8447-1e2b7cd1b5d9.mov";
    const addTable = () => editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    const addVideo = () => editor?.commands.openPrompt({
      "media-type": "video",
      alt: "Some Video",
      title: "Some Title Video",
      width: "400",
      height: "400",
    });
    const addImage = () => editor?.commands.openPrompt({
        "media-type": "img",
        alt: "Something else",
        title: "Something",
        width: "800",
        height: "400",
    });

  return (
    <>  
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => 
                editor.chain().focus().setParagraph().deleteRange({
                    from: editor.state.selection.head - 1,
                    to: editor.state.selection.head
                    }).run()
            }
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/text/en-US.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Normal</span>
                <span className="text-xs text-zinc-400">Normal Text</span>
            </div>
        </button>
        {/* <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => 
                editor.chain().focus().setSmallText().deleteRange({
                    from: editor.state.selection.head - 1,
                    to: editor.state.selection.head
                    }).run()
            }
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/text/en-US.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Small</span>
                <span className="text-xs text-zinc-400">Small Text</span>
            </div>
        </button> */}
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => 
                editor.chain().focus().toggleHeading({ level: 1 }).deleteRange({
                    from: editor.state.selection.head - 1,
                    to: editor.state.selection.head
                    }).run()
            }
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/header.57a7576a.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Heading 1</span>
                <span className="text-xs text-zinc-400">Big section heading</span>
            </div>
        </button>
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => 
                editor.chain().focus().toggleHeading({ level: 2 }).deleteRange({
                    from: editor.state.selection.head - 1,
                    to: editor.state.selection.head
                    }).run()
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
                editor.chain().focus().toggleHeading({ level: 3 }).deleteRange({
                    from: editor.state.selection.head - 1,
                    to: editor.state.selection.head
                    }).run()
            }
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Heading 3</span>
                <span className="text-xs text-zinc-400">Small section heading.</span>
            </div>
        </button>
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => addTable()}
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/simple-table.e31a23bb.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Table</span>
                <span className="text-xs text-zinc-400">Add Table</span>
            </div>
        </button>
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => addImage()}
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/image.33d80a98.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Image</span>
                <span className="text-xs text-zinc-400">Add Image</span>
            </div>
        </button>
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => addVideo()}
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/video.ceeec2c7.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Video</span>
                <span className="text-xs text-zinc-400">Add Video</span>
            </div>
        </button>
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => editor.chain().focus().toggleCodeBlock().deleteRange({
                from: editor.state.selection.head - 1,
                to: editor.state.selection.head
                }).run()}
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/code.a8b201f4.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Code</span>
                <span className="text-xs text-zinc-400">Add Code</span>
            </div>
        </button>
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => editor.chain().focus().deleteRange({
                from: editor.state.selection.head - 1,
                to: editor.state.selection.head
                }).toggleOrderedList().run()}
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/numbered-list.0406affe.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Numbered List</span>
                <span className="text-xs text-zinc-400">Add Numbered List</span>
            </div>
        </button>
        <button 
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100"
            onClick={() => editor.chain().focus().deleteRange({
                from: editor.state.selection.head - 1,
                to: editor.state.selection.head
                }).toggleBulletList().run()}
        >
            <img className="w-12 border border-zinc-200 rounded" src="https://www.notion.so/images/blocks/bulleted-list.0e87e917.png" />
            <div className="flex flex-col text-left">
                <span className="text-sm">Bullet List</span>
                <span className="text-xs text-zinc-400">Add Bullet List</span>
            </div>
        </button>
    </>
  )
}

export default SlashMenu

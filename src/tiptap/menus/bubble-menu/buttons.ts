/* @unocss-include */
import { Editor } from "@tiptap/react";


interface BubbleMenuItem {
  tooltip: string;
  action: (editor: Editor) => boolean;
  isActive: (editor: Editor) => boolean;
  iconClass: string;
}

export const generalButtons: BubbleMenuItem[] = [
  {
    tooltip: "Bold",
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
    iconClass: "i-ri-bold",
  },
  {
    tooltip: "Italic",
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
    iconClass: "i-ri-italic",
  },
  {
    tooltip: "Underline",
    action: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor: Editor) => editor.isActive("underline"),
    iconClass: "i-ri-underline",
  },
  {
    tooltip: "Strike",
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive("strike"),
    iconClass: "i-ri-strikethrough",
  },
  {
    tooltip: "Link",
    action: (openLinkModal: Function) => openLinkModal(),
    isActive: (editor: Editor) => editor.isActive("link"),
    iconClass: "i-ri-link",
  },
  {
    tooltip: "Code",
    action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor: Editor) => editor.isActive("code"),
    iconClass: "i-mdi-code",
  },
  // {
  //   name:'divider'
  // },
  {
    tooltip: "Align Left",
    action: (editor: Editor) =>
      editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: "left" }),
    iconClass: "i-mdi-align-horizontal-left",
  },
  {
    tooltip: "Align Right",
    action: (editor: Editor) =>
      editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: "right" }),
    iconClass: "i-mdi-align-horizontal-right",
  },
  // {
  //   name: "alignRight",
  //   label: "Align Right",
  //   action: (editor: Editor) =>
  //     editor.chain().focus().setTextAlign("right").run(),
  //   isActive: (editor: Editor) => editor.isActive({ textAlign: "right" }),
  //   icon: RxAlignRight,
  // },
  // {
  //   name: "alignJustify",
  //   label: "Align Justify",
  //   action: (editor: Editor) =>
  //     editor.chain().focus().setTextAlign("justify").run(),
  //   isActive: (editor: Editor) => editor.isActive({ textAlign: "justify" }),
  //   icon: RiAlignJustify,
  // },
  // {
  //   name: "divider",
  // },
  // {
  //   name: "h1",
  //   label: "H1",
  //   action: (editor: Editor) =>
  //     editor.chain().focus().toggleHeading({ level: 1 }).run(),
  //   isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
  //   icon: RiH1,
  // },
  // {
  //   name: "h2",
  //   label: "H2",
  //   action: (editor: Editor) =>
  //     editor.chain().focus().toggleHeading({ level: 2 }).run(),
  //   isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
  //   icon: RiH2,
  // },
  // {
  //   name: "h3",
  //   label: "H3",
  //   action: (editor: Editor) =>
  //     editor.chain().focus().toggleHeading({ level: 3 }).run(),
  //   isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
  //   icon: RiH3,
  // },
  // {
  //   name: "divider",
  // },
  // {
  //   name: "orderedList",
  //   label: "Ordered List",
  //   action: (editor: Editor) =>
  //     editor.chain().focus().toggleOrderedList().run(),
  //   isActive: (editor: Editor) => editor.isActive("orderedList"),
  //   icon: RiListOrdered,
  // },
  // {
  //   name: "bulletList",
  //   label: "Bullet List",
  //   action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
  //   isActive: (editor: Editor) => editor.isActive("bulletList"),
  //   icon: RiListUnordered,
  // },
  // {
  //   name: "taskList",
  //   label: "Task List",
  //   action: (editor: Editor) => editor.chain().focus().toggleTaskList().run(),
  //   isActive: (editor: Editor) => editor.isActive("taskList"),
  //   icon: RiListCheck2,
  // },
  // {
  //   name: "divider",
  // },
  // {
  //   name: "table",
  //   label: "Table",
  //   action: () => null,
  //   isActive: (editor: Editor) => editor.can().deleteTable(),
  //   icon: RiTableLine,
  // },
  // {
  //   name: "blockquote",
  //   label: "Blockquote",
  //   action: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
  //   isActive: (editor: Editor) => editor.isActive("blockquote"),
  //   icon: RiDoubleQuotesL,
  // },
  // {
  //   name: "codeBlock",
  //   label: "Code Block",
  //   action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
  //   isActive: (editor: Editor) => editor.isActive("codeBlock"),
  //   icon: RiCodeBoxLine,
  // },
  // {
  //   name: "divider",
  // },
  // {
  //   name: 'horizontalRule',
  //   label: 'Horizontal Rule',
  //   action: (editor: Editor) => editor.chain().focus().setHorizontalRule().run(),
  //   icon: RiSeparator,
  // },
  // {
  //   name: 'hardBreak',
  //   label: 'Hard Break',
  //   action: (editor: Editor) => editor.chain().focus().setHardBreak().run(),
  //   icon: RiTextWrap,
  // },
  // {
  //   name: 'divider',
  // },
  // {
  //   name: 'undo',
  //   label: 'Undo',
  //   action: (editor: Editor) => editor.chain().focus().undo().run(),
  //   icon: RiArrowGoBackLine,
  // },
  // {
  //   name: 'redo',
  //   label: 'Redo',
  //   action: (editor: Editor) => editor.chain().focus().redo().run(),
  //   icon: RiArrowGoForwardLine,
  // }
];

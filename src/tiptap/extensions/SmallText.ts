import { mergeAttributes, Node } from '@tiptap/core'

export interface SmallOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    smallText: {
      /**
       * Toggle a paragraph
       */
      setSmallText: () => ReturnType,
    }
  }
}

export const SmallText = Node.create<SmallOptions>({
  name: 'smallText',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'small' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['small', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setSmallText: () => ({ commands }) => {
        return commands.setNode(this.name)
      },
    }
  },

  // addKeyboardShortcuts() {
  //   return {
  //     'Mod-Alt-0': () => this.editor.commands.setSmallText(),
  //   }
  // },
})
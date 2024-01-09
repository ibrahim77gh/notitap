import { mergeAttributes, Node } from '@tiptap/core';

export interface ListItemOptions {
  HTMLAttributes: Record<string, any>,
}

export const ListItem = Node.create<ListItemOptions>({
  name: 'listItem',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  content: 'paragraph block*',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'li',
        getAttrs: (element: Element) => {
          const dblocks = Array.from(element.querySelectorAll('div.dblock'));
          console.log(dblocks)
          return { dblocks };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, dblocks }) {
    const renderedDblocks = dblocks.map((dblock) => {
      // Convert each dblock to li content as needed
      // For simplicity, assuming dblock content is a single paragraph
      const paragraphContent = dblock.querySelector('p')?.innerHTML || '';
      return ['li', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0, ['p', 0, paragraphContent]];
    });

    return ['li', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0, ...renderedDblocks];
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    }
  },
});

import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core';

export interface SmallTextOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    smallText: {
      /**
       * Set a small text node
       */
      setSmallText: () => ReturnType;
    };
  }
}

export const SmallText = Node.create<SmallTextOptions>({
  name: 'smallText',

  addOptions() {
    return {
      HTMLAttributes: {
        style: {
          fontSize: 'small', // Set your desired small font size here
        },
      },
    };
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  parseHTML() {
    return [{ tag: 'p.small-text' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setSmallText: () => ({ commands }) => {
        return commands.setNode(this.name);
      },
    };
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: /^(\/)\s$/,
        type: this.type,
      }),
    ];
  },
});

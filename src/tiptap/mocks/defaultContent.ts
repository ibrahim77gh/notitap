import { Content } from "@tiptap/react";

export const content: Content = {
  type: "doc",
  content: [
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Welcome to Real Time Edior.",
            },
          ],
        },
      ],
    },
  ],
};

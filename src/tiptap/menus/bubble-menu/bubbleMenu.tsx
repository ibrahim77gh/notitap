import { BubbleMenu, Editor, isNodeSelection } from "@tiptap/react";

import { generalButtons } from "./buttons";
import { NodeTypeDropdown } from "./NodeTypeDropdown";

import "./styles.scss";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = ({
  editor,
}) => {

  const shouldShowBubbleMenu = () => {
    const { selection } = editor.state;
    const { empty } = selection;

    // Don't show bubble menu if:
    // - The selected node is an image
    // - The selection is empty
    // - The selection is a node selection (for drag handles)
    if (editor.isActive("image") || empty || isNodeSelection(selection)) {
      return false;
    }

    return true;
  };

  return (
    <BubbleMenu
      editor={editor}
      className="bubble-menu"
      tippyOptions={{
        duration: 200,
        animation: "shift-toward-subtle",
        moveTransition: "transform 0.2s ease-in-out",
      }}
      shouldShow={shouldShowBubbleMenu}
    >
      <NodeTypeDropdown editor={editor} />
      {generalButtons.map((btn) => {
        return (
          <button
            type="button"
            className="bubble-menu-button"
            onClick={() => btn.action(editor)}
            key={btn.tooltip}
          >
            <i className={`${btn.iconClass} scale-150`} />
          </button>
        );
      })}
    </BubbleMenu>
  );
};

import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance, Props as TippyProps } from "tippy.js";
import CommandsList from "./CommandsList";
import { Editor } from "@tiptap/react";// Replace "your-editor-library" with the actual editor library you are using

interface RenderItemsProps {
  editor: Editor; // Replace "Editor" with the actual type of your editor
  clientRect: ClientRect;
  event: KeyboardEvent;
}

const renderItems = () => {
  let component: ReactRenderer;
  let popup: TippyInstance<TippyProps> | null = null;

  return {
    onStart: (props: RenderItemsProps) => {
      component = new ReactRenderer(CommandsList, {
        props,
        editor: props.editor,
      });

      popup = tippy("body", {
        getReferenceClientRect: () => props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      })[0];
    },
    onUpdate: (props: RenderItemsProps) => {
      component.updateProps(props);

      if (popup) {
        popup.setProps({
          getReferenceClientRect: () => props.clientRect,
        });
      }
    },
    onKeyDown: (props: RenderItemsProps) => {
      if (props.event.key === "Escape") {
        if (popup) {
          popup.hide();
        }

        return true;
      }

      return (component?.ref as any)?.onKeyDown?.(props) || false;
    },
    onExit: () => {
      if (popup) {
        popup.destroy();
      }

      component.destroy();
    },
  };
};

export default renderItems;

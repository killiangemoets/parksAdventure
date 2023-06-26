import { FC, ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImageElement, ImageElementHover } from "./imagesInput.style";
import { ItemSortableContainer } from "./itemSortable.style";

export type ItemSortableProps = {
  item: {
    id: string;
    first: boolean;
    content: ReactNode;
    contentHover: ReactNode;
  };
};

const ItemSortable: FC<ItemSortableProps> = ({ item }) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const firstItemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridRow: "span 2",
    gridColumn: "span 2",
  };

  return (
    <ItemSortableContainer
      ref={setNodeRef}
      style={item.first ? firstItemStyle : style}>
      <ImageElement>
        {item.content}
        <ImageElementHover {...listeners} {...attributes} />
        {item.contentHover}
      </ImageElement>
    </ItemSortableContainer>
  );
};

export default ItemSortable;

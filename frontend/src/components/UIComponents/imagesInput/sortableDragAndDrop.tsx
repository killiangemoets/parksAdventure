import { FC, ReactNode } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import ItemSortable from "./itemSortable.component";

export type SortableDragAndDropProps = {
  handleDragEnd: (event: DragEndEvent) => void;
  items: {
    id: string;
    first: boolean;
    content: ReactNode;
    contentHover: ReactNode;
  }[];
};
const SortableDragAndDrop: FC<SortableDragAndDropProps> = ({
  handleDragEnd,
  items,
}) => {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={horizontalListSortingStrategy}>
        {items.map((item) => (
          <ItemSortable key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableDragAndDrop;

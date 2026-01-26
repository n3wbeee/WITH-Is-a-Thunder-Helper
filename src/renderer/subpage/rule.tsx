import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';

import save from '../../../assets/icons/save.svg';
import create from '../../../assets/icons/create.svg';

import '../styleComplied.css';

function TriggerCard() {
	return (
		<div className="h-24 rounded-2xl m-4 shrink-0 shadow bg-neutral-50"></div>
	);
}

function Rule() {
	const [items, setItems] = useState([
		{ id: '1', content: 'Item 1' },
		{ id: '2', content: 'Item 2' },
		{ id: '3', content: 'Item 3' },
	]);

	const dragHandler = (result: any) => {
		if (!result.destination) return;

		const newItems = Array.from(items);
		const [reorderedItem] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, reorderedItem);

		setItems(newItems);
	};

	return (
		<div className="flex flex-1 h-full overflow-auto">
			{/* 规则触发器 */}
			<div className="w-64 h-full overflow-auto flex flex-col">
				<div className="w-full h-8 flex items-center justify-end p-2 gap-2 bg-neutral-50">
					<img src={save} className="cursor-pointer" />
					<img src={create} className="cursor-pointer" />
				</div>
				<div className="bg-neutral-200 w-full h-px" />
				<DragDropContext onDragEnd={dragHandler}>
					<Droppable droppableId="rule-list">
						{(provided, snapshot) => (
							<div
								className="flex flex-col flex-1"
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{items.map((item, index) => (
									<Draggable
										key={item.id}
										draggableId={item.id}
										index={index}
									>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<TriggerCard />
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>

			<div className="bg-neutral-200 w-px h-full"></div>

			<div className="flex-1"></div>
		</div>
	);
}

export default Rule;

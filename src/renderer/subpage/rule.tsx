import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
const { v4: uuidv4 } = require('uuid');
import { useState } from 'react';

import save from '../../../assets/icons/save.svg';
import create from '../../../assets/icons/create.svg';

import '../styleComplied.css';

function TriggerCard(item: any) {
	return (
		<div className="h-24 rounded-2xl m-4 shrink-0 shadow bg-neutral-50">
			<p className="select-none pl-2 pt-2 pb-1">{item.name}</p>
			<div className="bg-neutral-200 w-full h-px" />
		</div>
	);
}

function Rule() {
	const [items, setItems] = useState([
		{
			name: '规则1',
			trigger: 'critical_ias',
			action: [],
			active: true,
			id: uuidv4(),
		},
		{
			name: '规则1',
			trigger: 'critical_ias',
			action: [],
			active: true,
			id: uuidv4(),
		},
	]);

	const dragHandler = (result: any) => {
		if (!result.destination) return;

		const newItems = Array.from(items);
		const [reorderedItem] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, reorderedItem);

		setItems(newItems);
	};

	return (
		<DragDropContext onDragEnd={dragHandler}>
			<div className="flex flex-1 h-full overflow-hidden">
				{/* 规则页 */}
				<div className="w-64 h-full flex flex-col">
					{/* 工具栏*/}
					<div className="w-full h-8 flex items-center justify-end p-2 gap-2 bg-neutral-50">
						<img src={save} className="cursor-pointer" />
						<img src={create} className="cursor-pointer" />
					</div>
					<div className="bg-neutral-200 w-full h-px" />

					{/* 规则卡片展示区 */}
					<Droppable droppableId="rule-list">
						{(provided, snapshot) => (
							<div
								className="flex flex-col flex-1 overflow-auto"
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
												<TriggerCard {...item} />
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>

				<div className="bg-neutral-200 w-px h-full"></div>

				<div className="flex-1"></div>
			</div>
		</DragDropContext>
	);
}

export default Rule;

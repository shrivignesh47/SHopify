import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
// import './Customize.css'; // Your CSS file

const DraggableItem = ({ item, index }) => (
    <Draggable draggableId={item.id} index={index}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="draggable-item"
            >
                {item.content}
            </div>
        )}
    </Draggable>
);

const CustomizePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState(location.state?.form?.items || [
        { id: '1', content: 'Header' },
        { id: '2', content: 'Main Content' },
        { id: '3', content: 'Footer' },
    ]);

    const handleReorder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const updatedItems = Array.from(items);
        const [movedItem] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, movedItem);

        setItems(updatedItems);
    };

    const handleSave = () => {
        // Save the layout and navigate back
        console.log('Layout saved:', items);
        navigate('/'); // Navigate back to the home or another page
    };

    return (
        <div className="customize-page">
            <h2>Customize Your Template</h2>
            <DragDropContext onDragEnd={handleReorder}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="droppable-container"
                        >
                            {items.map((item, index) => (
                                <DraggableItem key={item.id} item={item} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={handleSave} className="save-button">Save Layout</button>
        </div>
    );
};

export default CustomizePage;

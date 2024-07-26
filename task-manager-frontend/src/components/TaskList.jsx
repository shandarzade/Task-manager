import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TaskCard, Column } from './index';
import taskService from '../Auth/config';
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState({}); 
    const stagesOptions = ['TODO', 'IN PROGRESS', 'DONE'];

    useEffect(() => {
        taskService.getTasks([])
            .then(fetchedTasks => {
                setTasks(fetchedTasks);
                const groupedTasks = stagesOptions.reduce((acc, stage) => {
                    acc[stage] = fetchedTasks.filter(task => task.stage === stage);
                    return acc;
                }, {});
                setColumns(groupedTasks);
            });
    }, []);

    const handleDragEnd = (result) => {
        const { source, destination } = result
        
        console.log(result);

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const updatedColumns = { ...columns };
        const sourceColumn = [...updatedColumns[source.droppableId]];
        const destinationColumn = [...updatedColumns[destination.droppableId]];
        const [removed] = sourceColumn.splice(source.index, 1);
        destinationColumn.splice(destination.index, 0, removed);

        updatedColumns[source.droppableId] = sourceColumn;
        updatedColumns[destination.droppableId] = destinationColumn;

        setColumns(updatedColumns);
    };

    return (
        <Container>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='flex flex-nowrap w-full'>
                    {stagesOptions.map((stage) => (
                        <Column key={stage} stage={stage}>
                            <Droppable droppableId={stage}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {columns[stage]?.map((task, index) => (
                                            <TaskCard
                                                key={task._id}
                                                index={index}
                                                task={task}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Column>
                    ))}
                </div>
            </DragDropContext>
        </Container>
    );
}

export default TaskList;

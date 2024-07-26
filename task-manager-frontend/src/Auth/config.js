import conf from "../conf/conf";

export class TaskService {
    async createTask({ title, content }) {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            };
            const response = await fetch(`${conf.baseUrl}/tasks/add-task`, requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error while creating Task in createTask service:', error);
            throw error;
        }
    }

    async updateTask() {
        try {
            const response = await fetch(`${conf.baseUrl}/tasks/update-task`);
            return response;
        } catch (error) {
            console.error('Error while updating Task in updateTask service:', error);
            throw error;
        }
    }

    async deleteTask() {
        try {
            const response = await fetch(`${conf.baseUrl}/tasks/delete-task`);
            return response;
        } catch (error) {
            console.error('Error while deleting Task in deleteTask service:', error);
            throw error;
        }
    }

    async getTask() {
        try {
            const response = await fetch(`${conf.baseUrl}/tasks/get-tasks`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data.data; 
        } catch (error) {
            console.error('Error while fetching tasks:', error);
            throw error; 
        }
    }
    
    async getTasks() {
            return (fetch(`${conf.baseUrl}/tasks/get-tasks`)
            .then((response) => response.json())
            .then( ( data) => {
            //    console.log(data.data)
                return data.data
            })
            .catch( (error) => {
                console.error('Error while fetching Task from api in getTask service:', error);
                throw error;
    }))
            
    }
}

const taskService = new TaskService();

export default taskService;

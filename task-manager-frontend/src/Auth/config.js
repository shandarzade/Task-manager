import conf from "../conf/conf";

export class TaskService {
    async createTask() {
        try {
            const response = await fetch(`${conf.baseUrl}/tasks/add-task`);
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
            const response = await fetch(`${conf.baseUrl}/tasks/get-task`);
            return response;
        } catch (error) {
            console.error('Error while fetching Task from api in getTask service:', error);
            throw error;
        }
    }
    
    async getTasks() {
        try {
            const response = await fetch(`${conf.baseUrl}/tasks/get-tasks`);
            return response;
        } catch (error) {
            console.error('Error while fetching Task from api in getTask service:', error);
            throw error;
        }
    }
}

const taskService = new TaskService();

export default taskService;

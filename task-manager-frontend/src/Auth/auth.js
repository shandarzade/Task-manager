import axios from "axios";
import conf from "../conf/conf";

export class AuthService {
  
    // async createAccount({firstName, lastName,email, password}) {
    //     try {
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ title: 'React POST Request Example' }
    //         };
    //         const response = await fetch(`${conf.baseUrl}/users/register`, requestOptions);
    //         const data = await response.json();
    //         alert("user created succesfully")
    //         return this.login(data.email, data.password);
    //     } catch (error) {
    //         console.error('Error while creating account in createAccount service:', error);
    //         throw error;
    //     }
    // }

    async createAccount({ firstName, lastName, email, password }) {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            };
    
            const response = await fetch(`${conf.baseUrl}/users/register`, requestOptions);
            console.log(response)
            if(response.status == 409){
                throw new Error('Email already exist')
            }
            if (!response.ok) {
                throw new Error('Failed to create account');
            }
            const data = await response.json();

            // alert("User created successfully");
            return data; 
            
        } catch (error) {
            console.error('Error while creating account in createAccount service:', error);
            throw error;
        }
    }
    

    async login(email, password) {
        try {
            return await axios.post(`${conf.baseUrl}/users/login`, { email, password });
        } catch (error) {
            console.error('Error while login account:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await fetch(`${conf.baseUrl}/users/get-user`);
            return await response.json();
        } catch (error) {
            console.error('Error while fetching current user:', error);
            throw error;
        }
    }

    async logout() {
        try {
            const response = await fetch(`${conf.baseUrl}/users /logout`);
            return response;
        } catch (error) {
            console.error('Error while logout account:', error);
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService;

import axios from 'axios';
const url = "https://randomuser.me/api";


export const getUserData = async(pageNumber=1) => {
    try{
        const response = await axios.get(`${url}?page=${pageNumber}`);
        return response.data;
    }catch(err){
        console.log(err);
    }
    
   
}

import React, { useEffect, useState } from 'react';
import { getUserData } from '../services/userAPI'; 

const Counter = () => {
    const [count, setCount] = useState(0);
    const [userData, setUserData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    
    useEffect(async()=> {
        try{
            const fetchedData = await getUserData(pageNumber);
            setUserData(fetchedData.results);
            setPageNumber(fetchedData.info.page);
        }catch(err){
            console.log(err);
        }
    }, []);

    const fetchNextUser = async () => {
        try{
            const fetchedData = await getUserData(pageNumber+1);
            setUserData([...userData, ...fetchedData.results]);
            setPageNumber(fetchedData.info.page);
        }catch(err){
            console.log(err);
        }
    }
    
    const increaseCount = () => {
        setCount(count+1);
    }

    const decreaseCount =() => {
        setCount(count-1);
    }

    const getUserName = user => (
        `${user.name.first} ${user.name.last}`
    )

    const getUserPortrait = user => user.picture.medium;

    return(
    <div>
        <div className="counter-section">
        <button onClick={()=>increaseCount()}>+</button>
        <span>{count}</span>
        <button disabled={count===0} onClick={()=>decreaseCount()}>-</button>
        </div>
        <div className="user-section">
        <button onClick={fetchNextUser}>Load More</button>
            {userData.map((user, idx) => (
                <div key={`${idx}`}>
                    <div>{getUserName(user)}</div>
                    <img src={getUserPortrait(user)}/>
                </div>
            ))}
            
        </div>
    </div>
    )
};
export default Counter;
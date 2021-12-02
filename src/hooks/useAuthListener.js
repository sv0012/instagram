import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListener = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser)=> {
            //we have a user hence we can store it in the local storage
            if(authUser) {
                localStorage.setItem('authUser',JSON.stringify(authUser));
                setUser(authUser);
            } else {
                //we dont have an authUser
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
        return ()=> listener();
        
    }, [firebase]);

    return { user };
}

export default useAuthListener

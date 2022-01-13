import React, { useEffect } from 'react';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/sidebar';
import useUser from '../hooks/useUser';
import LoggedInUserContext from '../context/loggedInUser';








const Dashboard = ({ user: loggedInUser }) => {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  

  
  
    
    useEffect(() => {
        document.title = 'Instagram';
       
      }, []);
      
      
    return (
      <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
         <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg w-full" >
              <Timeline />
              <Sidebar />

            </div>
            
        </div>
      </LoggedInUserContext.Provider>
       
    )
}

export default Dashboard

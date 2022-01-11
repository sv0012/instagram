import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from '../components/Header'
import FirebaseContext from '../context/firebase';
import { storage } from '../lib/firebase';
import * as ROUTES from '../constants/routes';
import UserContext from '../context/user';
import useUser from '../hooks/useUser';

const PropicUpload = () => {
    const { firebase } = useContext(FirebaseContext);
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const history = useHistory();
    const [pic, setPic] = useState("");
    const isInvalid = pic === '';
    
    console.log(user?.docId)

    useEffect(() => {
        document.title = 'Upload Profile Picture  - Instagram';
    }, [])

    const uploadImage = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`profilepic/${pic.name}`).put(pic);
        
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("profilepic")
                    .child(pic.name)
                    .getDownloadURL()
                    .then(durl => {
                        try {
                            firebase.firestore().collection('users').doc(user?.docId).update({
                                imageSrc: durl,
                            });
            
                            history.push(ROUTES.DASHBOARD);
            
                        } catch (error) {
                           
                            setPic('');
                        }
                       
                    });
                    
            }
        );

        
        };


    return (
        <div className="bg-gray-background">
        <Header />
        <div className="flex flex-col w-2/5  mx-auto">
            <div>
                <h1 className="mx-auto text-center text-xl py-8">Choose Your Profile Picture</h1>
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                <form className="flex flex-col w-full" onSubmit={uploadImage} method="POST">
                    <div className="flex w-full">

                        <input className="hidden" id="file" type="file"
                            onChange={(e) => setPic(e.target.files[0])} />
                        <label for="file" className="text-gray-base text-center w-full border border-gray-primary rounded h-12 font-bold cursor-pointer pt-2 mb-2"  >
                            Choose Image
                        </label>
                    </div>
                    <button disabled={isInvalid} type="submit" className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50 cursor-default'}`} >
                        Upload Image
                    </button>
                </form>
            </div>
        </div>

    </div>

    )
}

export default PropicUpload

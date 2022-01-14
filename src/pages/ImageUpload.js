import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { storage } from '../lib/firebase';
import { v4 as uuid } from 'uuid';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';





const ImageUpload = ({ user }) => {
    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");    
    const [usersId, setUsersId] = useState(user.uid);
    const isInvalid = caption === '' || image === '';

    useEffect(() => {
        document.title = 'Upload Image - Instagram';
    }, [])


    const uploadImage = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(durl => {
                        try {
                            firebase.firestore().collection('photos').add({
                                caption: caption,
                                comments: [],
                                dateCreated: Date.now(),
                                imageSrc: durl,
                                likes: [],
                                photoId: uuid(),
                                userId: usersId
            
                            });
            
                            history.push(ROUTES.DASHBOARD);
            
                        } catch (error) {
                            setCaption('');
                            setImage('');
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
                    <h1 className="mx-auto text-center text-xl py-8">Create a new post</h1>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <form className="flex flex-col w-full" onSubmit={uploadImage} method="POST">
                        <div className="flex w-full">
                            <input
                                aria-label="Caption"
                                type="text"
                                placeholder="Enter the caption"
                                className="text-sm text-gray-base w-full justify-center mx-auto py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                onChange={(e) => setCaption(e.target.value)}
                                value={caption}
                            />
                        </div>
                        <div className="flex w-full">

                            <input className="hidden" id="file" type="file"  accept="image/png, image/jpeg"
                                onChange={(e) => setImage(e.target.files[0])} />
                            <label for="file" className="text-gray-base text-center w-full border border-gray-primary rounded h-12 font-bold cursor-pointer pt-2 mb-2"  >
                            {
                            image ? <p>{image.name}</p>  : <p>Choose Image</p>
                        }
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


export default ImageUpload;


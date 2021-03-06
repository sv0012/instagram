import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { storage } from '../lib/firebase';

const Edit = ({ caption, imageSrc, docId }) => {
    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();
    const [prevCaption, setPrevCaption] = useState(false);
    const [editCaption, setEditCaption] = useState(caption);
    const [editImage, setEditImage] = useState();
    const isInvalid = editCaption === '' || editImage === '';
    const [preview, setPreview] = useState(imageSrc);

    const handleChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        setEditImage(e.target.files[0])

    }

    const handleCaption = async (e) => {
        setEditCaption(e.target.value)
        setPrevCaption(true);
    }



    const uploadImage = (e) => {
        e.preventDefault();
        if (editImage && prevCaption) {
            const uploadTask = storage.ref(`images/${editImage.name}`).put(editImage);

            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(editImage.name)
                        .getDownloadURL()
                        .then(durl => {
                            try {
                                firebase.firestore().collection('photos').doc(docId).update({
                                    imageSrc: durl,
                                    caption: editCaption,
                                });

                                history.push(ROUTES.DASHBOARD);

                            } catch (error) {
                                setEditCaption('');
                                setEditImage('');
                            }

                        });

                }
            );
            console.log('both was updated')
        }
        else if (editImage) {
            const uploadTask = storage.ref(`images/${editImage.name}`).put(editImage);

            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(editImage.name)
                        .getDownloadURL()
                        .then(durl => {
                            try {
                                firebase.firestore().collection('photos').doc(docId).update({
                                    imageSrc: durl,

                                });

                                history.push(ROUTES.DASHBOARD);

                            } catch (error) {

                                setEditImage('');
                            }

                        });

                }
            );
            console.log('image was updated')
        }
        else if (prevCaption) {
            try {
                firebase.firestore().collection('photos').doc(docId).update({

                    caption: editCaption,
                });

                history.push(ROUTES.DASHBOARD);

            } catch (error) {
                setEditCaption('');

            }
            console.log('caption was updated')

        }
        else {

            history.push(ROUTES.DASHBOARD);
            console.log('nothing was updated')

        }




    };

    const handleDelete = async () => {
        await firebase.firestore().collection('photos').doc(docId).delete()
        history.push(ROUTES.DASHBOARD)
    }

    return (
        <div className="flex flex-col w-2/5  mx-auto">
            <div className='flex items-center'>
                <h1 className="mx-auto text-center text-xl py-8">Edit post</h1>
                <button onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>

                </button>

            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                <img
                    className=" h-100 w-100 flex mb-4"
                    alt=''
                    src={preview}
                    onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                    }}
                />
                <form className="flex flex-col w-full" onSubmit={uploadImage} method="POST">
                    <div className="flex w-full">
                        <input
                            aria-label="Caption"
                            type="text"
                            placeholder="Enter the caption"
                            size='50'
                            className="text-sm text-gray-base w-full justify-center mx-auto py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={handleCaption}
                            value={editCaption}
                        />
                    </div>
                    <div className="flex w-full">

                        <input className="hidden" id="file" type="file" accept="image/png, image/jpeg"
                            onChange={handleChange} />
                        <label for="file" className="text-gray-base text-center w-full border border-gray-primary rounded h-12 font-bold cursor-pointer pt-2 mb-2"  >
                            Choose Image
                        </label>
                    </div>
                    <button disabled={isInvalid} type="submit" className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50 cursor-default'}`} >
                        Edit Post
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Edit
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { SET_USER, SET_LOADING_STATUS,  GET_ARTICLES} from '../actions/actionType';
import db from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, orderBy, query, onSnapshot } from 'firebase/firestore/lite';

const coll = collection(db, 'articles');

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

export const setLoading = (status)=>({
    type: SET_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload)=>({
    type: GET_ARTICLES,
    payload: payload,
})

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider).then((payload) => {
            dispatch(setUser(payload.user));
        })
        .catch((error) => alert(error.message));
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) =>{
            if(user) {
                dispatch(setUser(user));
            }
        })
    }
}

export function signOutAPI() {
    return(dispatch)=>{
        auth.signOut().then(()=>{
            dispatch(setUser(null));
        }).catch((error)=>{
            console.log(error.message)
        })
    }
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        if(payload.image !== ''){
            const storage = getStorage();
            const storageRef = ref(storage, `images/${payload.image.name}%`);
            const uploadTask = uploadBytesResumable(storageRef, payload.image);
            uploadTask.on("state_changed", (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(`progress: ${progress}%`);
            }, (error)=>{
                console.log(error.code)
            }, async() => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                addDoc(coll, {
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL
                    },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comments: 0,
                    description: payload.description,
                })
                dispatch(setLoading(false));
            })        

        }else if(payload.video){

            addDoc(coll, {
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL
                },
                video: payload.video,
                sharedImg: '',
                comments: 0,
                description: payload.description,
            })
            dispatch(setLoading(false));
        }
    }
}

export function getArticleApi(){
    return (dispatch)=>{
        const coll = collection(db, 'articles');
        let payload;
        const q = query(coll, orderBy('actor.date', 'desc'));
        const snap = onSnapshot(q, snapshot=>{
            payload = snapshot.docs.map(doc=>doc.data());
            dispatch(getArticles(payload));
        })
    }
}

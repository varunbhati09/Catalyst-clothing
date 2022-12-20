import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth';
import{ getFirestore, doc, getDoc, setDoc,collection,writeBatch,query,getDocs, } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDGsRC-EnGMQkt5SHfmNAy8PXCQ6C2mVVY",
    authDomain: "crwn-clothing-e4949.firebaseapp.com",
    projectId: "crwn-clothing-e4949",
    storageBucket: "crwn-clothing-e4949.appspot.com",
    messagingSenderId: "655436677987",
    appId: "1:655436677987:web:116eeedb0c062df4534956"
  };
  


  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth= getAuth();
  export const signInWithGooglePopup= () => signInWithPopup(auth, provider);

  export const db= getFirestore();

  export const addCollectionAndDocuments= async(collectionKey,objectsToAdd) =>{
    const collectionRef= collection(db, collectionKey)
    const batch= writeBatch(db);

    objectsToAdd.forEach((object) =>{
      const docRef= doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef,object)
    });
    await batch.commit();

  }

  export const getCategoriesAndDocuments= async() =>{
    const collectionRef= collection(db,'categories');
    const q= query(collectionRef);

    const querySanpshot= await getDocs(q);
    const categoryMap = querySanpshot.docs.reduce((acc,docSnapshot) =>{
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()]= items;
      return acc;
    },{});

    return categoryMap;
  }

  export const createUserDocumentFromAuth= async(userAuth,additionalInformation={}) =>{
    if(!userAuth) return;

    const userDocRef= doc(db, 'users', userAuth.uid);
    const userSnapshot= await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email}= userAuth;
        const createdAt= new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log('error creating user',error.message);
        }

    }
    return userDocRef;

  };

  export const createAuthUserWithEmailAndPassword= async(email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword= async(email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async() => await signOut(auth);


  export const onAuthStateChangedListener= (callback) =>
    onAuthStateChanged(auth, callback,);
  
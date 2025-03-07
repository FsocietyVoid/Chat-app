import { toast } from 'react-toastify'
import './addUser.css'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useState } from 'react'
import { useUserStore } from '../../../../lib/userStore'

const AddUser = () => {

  const [user, setUser] = useState(null);

  const {currentUser} = useUserStore();

  const handleSearch = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const username =  formData.get("username");

    try {
      
      const userRef = collection(db, "users");
      const q = query(userRef , where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data());
      }

    } catch (err) {
      console.log(err);
      toast.error('Error searching for user.');
      
    }
  };

  const handleAdd = async () => {

    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userchats");

    try {

      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage :"",
          receiverID: currentUser.id,
          updateAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatRef, currentUser.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage :"",
          receiverID: user.id,
          updateAt: Date.now(),
        }),
      });
      toast.success('Chat added successfully!');
      
    } catch (err) {
      console.log(err);
      toast.error('Error adding chat.');
      
    }
  };

  return (
    <div className='addUser'>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username' />
            <button>Search</button>
        </form>
        {user && <div className="user">
            <div className="detail">
                <img src={user.avatar || "./avatar.png" } alt="" />
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
        </div>}
    </div>
  )
}

export default AddUser
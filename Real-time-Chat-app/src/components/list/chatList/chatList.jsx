import { doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { useUserStore } from '../../../lib/userStore';
import AddUser from './addUser/addUser';
import './chatList.css';
import { useEffect, useState } from "react";
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const { user } = useUserStore(); 


    const { currentUser } = useUserStore();
    const { chatId, changeChat } =  useChatStore();


    useEffect(() => {

        if (!currentUser?.id) {
            console.error("currentUser or currentUser.id is undefined");
            return;
          }
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const data = res.data();
            if (data) {
                const items = data.chats || []; // Ensure items is an array
                console.log(items, "items");
    
                const userPromises = items.map(async (item) => {
                    if (!item.receiverID) {
                        console.error(`receiverID is missing for item:`, item);
                        return { ...item, user: null };
                    }
                    try {
                        const userDocRef = doc(db, "users", item.receiverID);
                        const userDocSnap = await getDoc(userDocRef);
                    
                        if (userDocSnap.exists()) {
                            const user = userDocSnap.data();
                            return { ...item, user };
                        } else {
                            console.error(`No such document for receiverID: ${item.receiverID}`);
                            return { ...item, user: null };
                        }
                    } catch (error) {
                        console.error(`Error fetching user data for receiverID: ${item.receiverID}`, error);
                        return { ...item, user: null };
                    }
                });
                
                try {
                    const itemsWithUsers = await Promise.all(userPromises);
                    console.log(itemsWithUsers);
                    setChats(itemsWithUsers.sort((a, b) => b.updateAt - a.updateAt));
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.error("No data found for the current user.");
                setChats([]);
            }
        });
    
        return () => {
            unSub();
        };

    }, [currentUser.id]);
    
    
    const handleSelect = async (chat)=>{

       const userChats =  chats.map((item) => {
        const { user, ...rest} = item;
        return rest;
       });

       const chatIndex = userChats.findIndex(
        (item) => item.chatId === chat.chatId
       );

       userChats[chatIndex].isSeen = true;

       const userChatsRef = doc(db, "userchats", currentUser.id);

       try {

        await updateDoc(userChatsRef, {
            chats: userChats,

        });
        
        changeChat(chat.chatId, chat.user);
        
       } catch (err) {
        console.log(err);
        
       }

    }
    


  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="" />
                <input type="text" placeholder="Search or start new chat" />
            </div>
            <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className='add' onClick={ () => setAddMode((prev) =>!prev) } />
        </div>
        {chats && chats.map((chat) => (
            <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)} style={{backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"}}>
            <img src={chat.user?.avatar || "./avatar.png"} alt="" />
            <div className="texts">
                <span>{chat.user?.username}</span>
                <p>{chat.lastMessage}</p>
            </div>
            </div>    
        ))}
        
        {addMode && <AddUser/>}
    </div>
  )
};

export default ChatList
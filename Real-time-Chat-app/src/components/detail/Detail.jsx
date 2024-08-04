import { auth } from "../../lib/firebase"
import "./detail.css"

const Detail = () =>{
    return(
        <div className="detail">
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>Ashish Rajdeo</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Setting</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                    <span>Privacy % help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                    <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItems">
                            <div className="photoDetail">   
                            <img src="https://images.unsplash.com/photo-1720964880193-66d0ac29fcc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <span>floor.png</span>
                            </div>
                        <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItems">
                            <div className="photoDetail">   
                            <img src="https://images.unsplash.com/photo-1720964880193-66d0ac29fcc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <span>floor.png</span>
                            </div>
                        <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItems">
                            <div className="photoDetail">   
                            <img src="https://images.unsplash.com/photo-1720964880193-66d0ac29fcc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <span>floor.png</span>
                            </div>
                        <img src="./download.png" alt=""  className="icon"/>
                        </div>
                        <div className="photoItems">
                            <div className="photoDetail">   
                            <img src="https://images.unsplash.com/photo-1720964880193-66d0ac29fcc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <span>floor.png</span>
                            </div>
                          <img src="./download.png" alt="" className="icon" />
                        </div>
                 <div className="option">
                             <div className="title">
                           <span>Shared Files</span>
                             <img src="./arrowUp.png" alt="" />
                            </div>
                        </div>
                         <button>Block User</button>
                         <button className="logout" onClick={()=> auth.signOut()}>Logout</button>

                </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Detail
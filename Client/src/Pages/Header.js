import React from "react";
import Modal from 'react-modal';


const customStyles = {
    overlay:{
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            loginModal: false
        }
    }

    // For Modal
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    }

    logout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
    }

    render(){
        const { loginModal } = this.state;
    const { user } = this.props;
   
        return(
            <div>            
                <div className="position-absolute end-0 me-5 z-3">    

                         {console.log(user)}
                        {!user ? (
                            <form class="d-flex nav-form">
                                <button type="button" class="btn btn-danger me-2" onClick={() => {this.handleModal('loginModal', true)}}>Login</button>
                                <button type="button" class="btn btn-outline-light">Create an account</button>
                            </form>
                        ) : (
                            <form class="d-flex nav-form">
                                <img src={user.photos[0].value} className="circle" alt=" " />
                                <p className="text-white m-3">{user.displayName}</p>
                                <button type="button" class="btn btn-outline-light " onClick={this.logout}>Logout</button>
                            </form>
                        )}
                        
                        <Modal
    isOpen={loginModal}
    style={customStyles}
>
    <div>
        <h4 style={{ color: "#192F60" }} className="fw-bold d-inline">Login</h4>
        <div onClick={() => this.handleModal('loginModal', false)} className="close">
            <i className="bi bi-x-lg"></i>
        </div>
    </div>

    <div className="text-center">
        {/* Animated food icon */}
        <div className="food-animation mb-4">
            <i className="bi bi-basket2-fill" style={{ fontSize: "3rem", color: "#FF6347" }}></i>
        </div>

        <div className="m-5">
            <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: "#FF6347" }}>Email</label>
                <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{ color: "#FF6347" }}>Username</label>
                <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: "#FF6347" }}>Password</label>
                <input type="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
                <button className="btn btn-success px-4" style={{ backgroundColor: "#28A745", borderColor: "#28A745" }}>
                    Sign In
                </button>
            </div>
            <div>
                <input type="button" className="btn btn-outline-success px-4" value="Login in with Google" onClick={this.google} />
            </div>
        </div>
    </div>

    {/* Additional CSS */}
    <style jsx>{`
        .food-animation {
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-30px);
            }
            60% {
                transform: translateY(-15px);
            }
        }
    `}</style>
</Modal>

                
                </div>
            </div>
        )
    }
}

export default Header;
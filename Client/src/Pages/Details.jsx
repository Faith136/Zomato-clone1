import React from "react";
import axios from "axios";
import queryString from "query-string";
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../Style/detailPage.css';

const customStyles = {
    overlay: {
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

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            resId: undefined,
            galleryModal: false,
            menuModal: false,
            menu: [],
            formModal: false,
            subtotal: 0
        }
    }

    componentDidMount() {
        const q = queryString.parse(window.location.search);
        const { restuarant } = q;

        axios({
            url: `http://localhost:5500/restaurants/${restuarant}`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ restaurant: res.data.restaurants, resId: restuarant });
        })
        .catch(err => console.log(err));
    }

    handleModal = (state, value) => {
        const { resId } = this.state;

        if (state === "menuModal" && value === true) {
            axios({
                url: `http://localhost:5500/menu/${resId}`,
                method: 'get',
                headers: { 'Content-Type': 'application/JSON' }
            })
            .then(res => {
                const menu = res.data.menuItem.map(item => ({ ...item, qty: 0 }));
                this.setState({ menu });
            })
            .catch(err => console.log(err));
        }

        this.setState({ [state]: value });
    }

    addItems = (index, operationType) => {
        var total = 0;
        const items = [...this.state.menu];
        const item = items[index];

        if(operationType === 'add'){
            item.qty += 1;
        } else {
            item.qty -= 1;
        }

        items[index] = item;

        items.map((x) => {
            total += x.qty * x.price;
            return total;
        })
        this.setState({ menu: items, subtotal: total })
    }


    paypalPayment = async () => {
        const { subtotal } = this.state;
        console.log(subtotal);
        try {
            const response = await axios.post('http://localhost:5500/api/paypal/pay', 
            { amount: subtotal });
            window.location.href = response.data;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    }


    mpesaPayment = async () => {
        const { subtotal } = this.state;
        console.log(subtotal);
        try {
            const response = await axios.post('http://localhost:5500/mpesa/stk', 
            { amount: subtotal });
            window.location.href = response.data;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    }


    render() {
        const { restaurant, galleryModal, menuModal, menu, subtotal, formModal } = this.state;
        return (
            <div>
                <nav className="navbar bg-danger" data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="bannerCover">
                        <img src={restaurant.thumb} className="banner" alt=" " />
                        <input type="button" value="Click to see Image Gallery" className="gallery_button" onClick={() => this.handleModal('galleryModal', true)} />
                    </div>

                    <h2 className="heading mt-4">{restaurant.name}</h2>

                    <div>
                        <input type="button" className="btn btn-danger order_button" value="Place Online Order" onClick={() => this.handleModal('menuModal', true)} />
                    </div>

                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" id="tab-1" name="tab-group" defaultChecked />
                            <label htmlFor="tab-1">Overview</label>
                            <div className="content">
                                <div className="about">About this place</div>
                                <div className="head">Cuisine</div>
                                <div className="value">
                                    {restaurant.Cuisine && restaurant.Cuisine.map((cu, index) => `${cu.name}${index < restaurant.Cuisine.length - 1 ? ', ' : ''}`)}
                                </div>
                                <div className="head">Average Cost</div>
                                <div className="value">₹{restaurant.cost} for two people (approx.)</div>
                            </div>
                        </div>

                        <div className="tab ms-4">
                            <input type="radio" id="tab-2" name="tab-group" />
                            <label htmlFor="tab-2">Contact</label>
                            <div className="content">
                                <div className="value">Phone Number</div>
                                <div className="value-red">+91 {restaurant.contact_number}</div>
                                <div className="head">{restaurant.name}</div>
                                <div className="value">{restaurant.address}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Modal isOpen={galleryModal} style={customStyles}>
                    <div onClick={() => this.handleModal('galleryModal', false)} className="close"><i className="bi bi-x-lg"></i></div>
                    <Carousel showIndicators={false} showThumbs={false} showStatus={false}>
                        <div>
                            <img src={restaurant.thumb} className="gallery_img" alt=" " />
                        </div>
                    </Carousel>
                </Modal>

                <Modal isOpen={menuModal} style={customStyles}>
                    <div onClick={() => this.handleModal('menuModal', false)} className="close"><i className="bi bi-x-lg"></i></div>
                    <h3 className="menu_restaurant_name">{restaurant.name}</h3>
                    {menu.map((item, index) => (
                        <div className="menu" key={index}>
                            <div className="menu_body">
                                <h5 className="font_weight">{item.name}</h5>
                                <h5 className="font_weight">₹ {item.price}</h5>
                                <p className="item_details">{item.description}</p>
                            </div>
                            <div className="menu_image">
                                <img className="item_image" src={`./images/${item.image}`} alt="food" />
                                {item.qty === 0 ? (
                                    <div className="item_quantity_button" onClick={() => this.addItems(index, 'add')}>ADD</div>
                                ) : (
                                    <div className="item_quantity_button">
                                        <button onClick={() => this.addItems(index, 'sub')}> - </button>
                                        <span className="qty"> {item.qty} </span>
                                        <button onClick={() => this.addItems(index, 'add')} style={{ color: '#61B246' }}> + </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="payment">
                        {subtotal === undefined ? 
                            <h4 className="total font_weight">Subtotal: ₹ 0 </h4>
                            : <h4 className="total font_weight">Subtotal: ₹ {subtotal}</h4>}
                        <button className="btn btn-danger payment_button" onClick={() => {this.handleModal('menuModal', false); this.handleModal('formModal', true);}}>
                            Pay Now
                        </button>
                    </div>
                </Modal>

                <Modal isOpen={formModal} style={customStyles}>
                    <div onClick={() => this.handleModal('formModal', false)} className="close"><i className="bi bi-x-lg"></i></div>
                    <div style={{ width: '20em' }}>
                        <h3 className="menu_restaurant_name">{restaurant.name}</h3>
                        <label htmlFor="name" style={{ marginTop: '10px' }}>Name</label>
                        <input type="text" placeholder="Enter your name" className="form-control" id="name" />
                        <label htmlFor="mobile" style={{ marginTop: '10px' }}>Mobile Number</label>
                        <input type="text" placeholder="Enter mobile number" className="form-control" id="mobile" />
                        <label htmlFor="address" style={{ marginTop: '10px' }}>Address</label>
                        <textarea type="text" rows="4" placeholder="Enter your address" className="form-control" id="address"></textarea>
                        <button className="btn btn-primary px-4" style={{ marginTop: "18px" }} onClick={this.paypalPayment}>
                            <img src="https://www.edigitalagency.com.au/wp-content/uploads/PayPal-logo-white-png-horizontal.png" alt="PayPal" style={{ height: '25px' }} />
                        </button>
                        <button className="btn btn-primary px-4" style={{ marginTop: "18px" }} onClick={this.mpesaPayment}>
                            <img src="../Images/mpesa.png" alt="M-Pesa" style={{ height: '25px', width: "120px" }} />
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Details;

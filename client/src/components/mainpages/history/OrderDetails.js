import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import check from '../../../img/check.svg'
import error from '../../../img/error.svg'
import axios from 'axios'
import { store } from 'react-notifications-component';

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])

    const changeshipstt = async () =>{
        try{
         if(orderDetails.shippingstatus === "Waiting"){   
          const shippingstatus =    orderDetails.shippingstatus
         const res =  await axios.put(`/api/payment/${orderDetails._id}`,{shippingstatus})           
          // setShippingstt(res.data)
           //setStt(true)
           console.log(res.data.status)
           window.location.href = "/history";}
           else{
            store.addNotification({
                title: "This shipping was cofirmed!",
                message: "On the go",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2500,
                  onScreen: true
                },
                
              });
           }
        }catch(err){

        }
    }

    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page">
        <h2>Payment DetailS</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Country Code</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{orderDetails.address.recipient_name}</td>
                    <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                    <td>{orderDetails.address.postal_code}</td>
                    <td>{orderDetails.address.country_code}</td>
                </tr>
            </tbody>
        </table>
        <div className="alert">
            <img className="alerticon" src={check}></img>
            <h3>Thanh toán thành công</h3>
        </div>
        <h2>Details</h2>
        <table style={{margin: "30px 0px 30px 10px"}}>
            <thead>
                <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderDetails.cart.map(item =>(
                    <tr key={item._id}>
                        <td><img src={item.images.url} alt="" className="imgmota"/></td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>$ {item.price * item.quantity}</td>
                    </tr>
                    ))
                }
                
            </tbody>
        </table>
        <div className="alert warning">
            <h3>Total: ${orderDetails.total}</h3>
            <h3>Đã thanh toán: ${orderDetails.pay}</h3>
        </div>
        
        <h2>Shipping Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Reciver</th>
                    <th>shipping Address</th>
                    <th>City</th>
                    <th>phone number</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{orderDetails.shipname}</td>
                    <td>{orderDetails.shipaddress}</td>
                    <td>{orderDetails.shipcity+"-"+orderDetails.shipstate}</td>
                    <td>{orderDetails.shipphone}</td>
                    <td>{orderDetails.shippingstatus}</td>
                </tr>
            </tbody>
        </table>

        {
            (()=>{
                if(!isAdmin){
                    if(orderDetails.shippingstatus === "Waiting"){ return(
                                <div className="alert wait">
                                <img className="alerticon" src={error}></img>
                                <h3>Đang chờ xử lý</h3>
                                </div>)
                    }
                    else{
                        return ( 
                            <div className="alert ">
                            <img className="alerticon" src={check}></img>
                            <h3>Xác nhận chuyển hàng vào lúc: {orderDetails.shippingstatus}</h3>
                            </div> 
                        )
                    }
                }
            }

            )()
        }

        {
            isAdmin ? 
            <div className="submitbtn">
            <button className="shipbtn" onClick={changeshipstt}>Xác nhận giao hàng</button>
            </div>
            : ''
        }
        
    </div> 
    )}

export default OrderDetails

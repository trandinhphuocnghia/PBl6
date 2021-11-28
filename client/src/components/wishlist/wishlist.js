import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import unlike from '../../img/unlike.svg'

function Wlist() {
    const state = useContext(GlobalState)
    const [wishlist, setWishlist] = state.userAPI.wishlist
    const [token] = state.token
    const addCart = state.userAPI.addCart

    //add to wishlist
    const addToWishlist = async(wishlist) => {
        //
        await axios.patch('/user/addwishlist', {wishlist}, {
            headers: {Authorization: token}
        })
    }
    //
    const removeProduct = id =>{
        if(window.confirm("Remove from your wish list?")){
            wishlist.forEach((item, index) => {
                if(item._id === id){
                    wishlist.splice(index, 1)
                }
            })

            setWishlist([...wishlist])
            addToWishlist(wishlist)
        }}
        
        if(wishlist.length === 0) 
        return (<h2 style={{textAlign: "center", fontSize: "5rem"}}>Wishlist Empty</h2> )

         return (
        <div className="Wishlist">
            <h3 className="pagename">The Product You Liked</h3>
            {   
                wishlist.map(product => (
                    <div className="detail wishlist" key={product._id}>
                       
                        <img className="desimgcart" src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="wishlistbtn">
                            <div className="wishlistbtn1">        
                            <Link id="btn_buy_ws" to="#!" onClick={() => addCart(product)}>
                                Add to Cart
                            </Link>
                            <Link id="btn_view_ws" to={`/detail/${product._id}`}>
                                Detail
                            </Link>   
                            </div>
                            <div className="wishlistbtn2"
                            onClick={() => removeProduct(product._id)}
                            >
                                <h3>Unlike</h3>
                                <img src={unlike}></img>
                            </div>
                            </div>
                            
                            
                        </div>
                    </div>
                ))
            }

         
        </div>
    )
    
}

export default Wlist
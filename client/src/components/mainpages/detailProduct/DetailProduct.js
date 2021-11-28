import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import heart from '../../../img/heart2.svg'

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const addwishlist = state.userAPI.addWishList
    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img className="productimg" src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2> 
                    </div>
                    <div className="row">
                    <div className="pricebox">
                    <span>$ {detailProduct.price}</span>
                    
                      
                    <p>Sold: {detailProduct.sold}</p>

                    
                    </div>
                    <div className="pricebtn">
                    <Link  className="cart"
                    onClick={() => addCart(detailProduct)}>
                        ADD TO CART
                    </Link>
                    <Link className="wishlistbtn" 
                      onClick={() => addwishlist(detailProduct)}>   <img className="wsicon" src={heart}/>
                        <p className="ws">Add to wishlist</p></Link>
                    </div>
                    </div>
                    <div className="descriptionproduct">
                    <p className="title">Description: </p>
                    <p>{detailProduct.description}</p>
                    </div>
                    <div className="descriptionproduct">
                    <p className="title">Details: </p>
                    <div className="dpdata">
                    <p>- Số mảng ghép: {detailProduct.allstick}</p>
                    <p>- Chất liệu: {detailProduct.material}</p>
                    <p>- Số tuổi phù hợp: {detailProduct.age}</p>
                    <p>{detailProduct.content}</p>
                    
                    </div>
                    </div>
                    
                   
                </div>
            </div>

            <div>
                <h2>Same category</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category && product._id !== detailProduct._id

                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct

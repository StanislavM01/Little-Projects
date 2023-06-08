import { useEffect, useState } from 'react'
import styles from './Details.module.css'
import { useParams } from 'react-router-dom'
import productService from '../../services/productService'
import useMyProductStore from '../../app/productStore'

function Details() {
    let { productId } = useParams()
    let [productInfo, setProductInfo] = useState({})
    let myProducts = useMyProductStore(state => state.myProducts)
    let addToMyProducts = useMyProductStore(state => state.addProduct)
    let isAdded = myProducts.find(myProduct => myProduct.id == productInfo.id)

    useEffect(() => {
        (async function () {
            try {
                let productData = await productService.getOneProduct(productId)
                setProductInfo(productData)
            }
            catch (err) {
                alert('Try again later to reload current page')
            }

        })()
    }, [])

    function addProduct(productData) {
        addToMyProducts(productData)
    }

    return (
        <div className={`${styles['container-style']}`}>
            <div className={styles['card']}>
                <div className="card-body">
                    <div className={styles['div-header-container']}>
                        <h3 className={`${styles['header-style']} mb-0`}>{productInfo.title}</h3>
                        <h6 className={styles['card-subtitle']}>{productInfo.category}</h6>
                    </div>
                    <div className={`${styles['div-container-style']} row`}>
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="white-box text-center">
                                <img
                                    src={productInfo.image}
                                    className={`${styles['img-style']} img-responsive`}
                                />
                            </div>
                        </div>
                        <div className={`${styles['div-text-style']}col-md-7 col-sm-6`}>
                            <h4 className={`${styles['header-style']} box-title mt-5`}>Product description</h4>
                            <p>
                                {productInfo.description}
                            </p>
                            <h2 className="mt-5">${productInfo.price}</h2>

                            {!isAdded
                                ? <button onClick={() => addProduct(productInfo)} className="btn btn-primary btn-rounded">Buy Now <i className="fa fa-shopping-cart" /></button>
                                : <div className={styles['div-successfully-added']} >
                                    Successfuly added
                                </div>}


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
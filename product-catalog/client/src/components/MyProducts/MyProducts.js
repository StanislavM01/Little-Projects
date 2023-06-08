import styles from './MyProducts.module.css'
import useMyProductStore from '../../app/productStore'
import MyProductCard from '../MyProduct-Card/MyProductCard'

function MyProducts() {
    let allMyProducts = useMyProductStore(state => state.myProducts)
    let deleteProduct = useMyProductStore(state => state.removeProduct)

    function deleteHandler(productId) {
        deleteProduct(productId)
        console.log(productId)
    }

    return (
        <>

            <div className="container bootdey mt-3">
                <div className="col-md-9">
                    <div className={`${styles['product-list']} row`}>
                        <h1 className={styles['h3-style']}>You have {allMyProducts.length} products in your cart.</h1>
                        {allMyProducts.length
                            ? allMyProducts.map((productData) => <MyProductCard productData={productData} deleteHandler={deleteHandler} key={productData.id} />)
                            : ''}

                    </div>
                </div>
            </div>
        </>

    )
}

export default MyProducts
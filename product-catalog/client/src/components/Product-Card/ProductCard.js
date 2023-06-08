import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'
import useMyProductStore from '../../app/productStore'

function ProductCard({ product }) {
    let myProducts = useMyProductStore(state => state.myProducts)
    let addToMyProducts = useMyProductStore(state => state.addProduct)
    let isAdded = myProducts.find(myProduct => myProduct.id == product.id)

    function addProduct(productData) {
        addToMyProducts(productData)
    }

    return (
        <div className="col-xs-12 col-md-6 bootstrap snippets bootdeys">
            {/* product */}
            <div className={`${styles['product-content']} ${styles['product-wrap']} clearfix`}>
                <div className="row">
                    <div className="col-md-5 col-sm-12 col-xs-12">
                        <div className={styles['product-image']}>
                            <img
                                src={product.image}
                                className={`${styles['img-custom']}`}
                            />
                            <span className={`${styles['tag2']} ${styles['hot']}`}>HOT</span>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 col-xs-12">
                        <div className={styles['product-deatil']}>
                            <h5 className={styles['name']}>
                                <Link to={`/details/${product.id}`}>
                                    {product.title} <span>{product.category}</span>
                                </Link>
                            </h5>
                            <p className={styles['price-container']}>
                                <span>${product.price}</span>
                            </p>
                            <span className={styles['tag1']} />
                        </div>
                        <div className={styles['description']}>
                            <p className={styles['p-style']} title='Click the details button to view more information about the current product.'>{product.description.slice(0, 70)}....</p>
                        </div>
                        <div className={`${styles['product-info']} ${styles['smart-form']}`}>
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    {!isAdded
                                        ? <button onClick={() => addProduct(product)} className={`${styles['btn']} btn btn-success`} >
                                            Add to cart
                                        </button>
                                        : <div className={styles['div-successfully-added']} >
                                            Successfuly added
                                        </div>
                                    }

                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <Link to={`/details/${product.id}`} className={`${styles['btn']} btn btn-success`}>
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end product */}
        </div >
    )
}

export default ProductCard
import styles from './MyProductCard.module.css'
import { Link } from "react-router-dom"

function MyProductCard({productData,deleteHandler}) {

    return (
        <div key={productData.id} className="col-md-4 mb-3">
            <section className={styles['panel']}>
                <div className="pro-img-box">
                    <button onClick={() => deleteHandler(productData.id)} type="button" className={`${styles['button-remove-style']} close`} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <img className={styles['img-style']}
                        src={productData.image}
                        alt=""
                    />

                </div>
                <div className={`${styles['description-style']} panel-body text-center`}>
                    <h4>
                        <Link to={`/details/${productData.id}`} className={`${styles['pro-title']}`}>
                            {productData.title}
                        </Link>
                    </h4>
                    <p className="price">${productData.price}</p>


                </div>
            </section>
        </div>
    )
}

export default MyProductCard
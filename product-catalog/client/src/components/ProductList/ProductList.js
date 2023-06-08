import ProductCard from "../Product-Card/ProductCard"

function ProductList({ allProducts }) {
    return (
        <div className="container">

            {allProducts.length >= 1
                ? allProducts.map((productData) => <ProductCard product={productData} key={productData.id} />)
                : <h2>Not Matches Found</h2>
            }

        </div>
    )
}

export default ProductList
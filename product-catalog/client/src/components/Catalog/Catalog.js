import SearchBar from "../SearchBar/SearchBar"
import productService from "../../services/productService"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ProductList from "../ProductList/ProductList"

function Catalog() {
    let [allProducts, setAllProducts] = useState([])
    let [searchParams, setSearchParams] = useSearchParams()
    let [query, setQuery] = useState(() => {
        let string = searchParams.get('query')
        return string ? string : ''
    })

    useEffect(() => {
        (async function () {
            try {
                let dataWithProducts = await productService.getProducts(query)
                console.log(dataWithProducts)
                setAllProducts(dataWithProducts)
            } catch (err) {
                alert('Try again later to reload current page')
            }


        })()
    }, [query])



    function changeSearchParams(queryString) {
        setQuery(queryString)
        if (queryString) {
            setSearchParams({
                query: queryString
            })
        } else {
            setSearchParams({})
        }

    }




    return (
        <div>
            <SearchBar queryString={query} changeSearchParams={changeSearchParams} />
            <ProductList allProducts={allProducts} />

        </div>

    )
}

export default Catalog
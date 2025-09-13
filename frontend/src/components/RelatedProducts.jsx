import {useState, useContext, useEffect} from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title';
import ProductItem from './ProductItem';
const RelatedProducts = ({category, subCategory}) => {
 
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
 
    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            return product.category === category && product.subCategory === subCategory;
        });
        setRelatedProducts(filteredProducts.slice(0,5));
    }
    , [category, subCategory, products]);
    return (
    <>
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> 
                {relatedProducts.map((product) => (
                      <ProductItem
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                    />
                    
                ))}
            </div>
        </div>
    </>
  )
}

export default RelatedProducts
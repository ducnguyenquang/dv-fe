import ProductInformation from './components/ProductInformation/ProductInformation';
import './ProductDetail.less';

const ProductDetail = (): JSX.Element => {
    return <div className='productDetailBlock'>
        <ProductInformation />
    </div>
}

export default ProductDetail;

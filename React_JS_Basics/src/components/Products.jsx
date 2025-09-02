import './Style.css'

function Products(props){
    return(
        <div className="products">
            <h3>{props.title}</h3>
            <h3>{props.price}</h3>
            <h3>{props.description}</h3>
        </div>

    )
}
export default Products;
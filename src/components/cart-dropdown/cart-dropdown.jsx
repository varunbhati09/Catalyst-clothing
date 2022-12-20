import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import Cartitem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';


const CartDropdown= () =>{
    const {cartItems}= useContext(CartContext);
    const navigate = useNavigate();
    
    const checkoutHandler= () =>{
        navigate('/checkout');
    };
    
    return(
        <CartDropdownContainer>
            <CartItems>
                
                   { cartItems.length?(
                    cartItems.map((item) =>
                        <Cartitem key={item.id} cartItem={item}
                    />))
                :(
                    <EmptyMessage>Your Cart is Empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={checkoutHandler} >Cart</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
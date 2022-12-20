import { Outlet } from "react-router-dom";
import { Fragment, useContext} from "react";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firbebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {NavigationContainer,NavLink,NavLinks,LogoContainer} from './navigation.component.styles.jsx';


const Navigation=() =>{
    const{currentUser}= useContext(UserContext);
    const {isCartOpen}=useContext(CartContext)
   
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <div>
                        <CrwnLogo className='logo'/>
                    </div>
                </LogoContainer>
             
                <NavLinks>
                    {currentUser?(
                        <div>
                            <NavLink to='/shop' >
                                Shop
                                </NavLink>
                            <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                            
                        </div>
                        
                    ):(
                        <div>
                            <NavLink to='/shop' >
                            Shop
                            </NavLink>
                            <NavLink to='/auth' >
                            SignIN
                            </NavLink>
                            
                        </div>
                    )}
                  <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
  };

  export default Navigation;
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer= styled.div`
height: 70px;
width: 100%;
display: flex;
// background-color: rgba(20, 19, 19, 0.205);
justify-content: space-between;
margin-bottom: 25px;  `;

export const LogoContainer= styled(Link)`
      height: 100%;
      width: 70px;
     
      padding: 20px;
`;

export const NavLinks= styled.div`
      width: 50%;
      height: 100%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: flex-end;
`;

export const NavLink= styled(Link)`
color: white;
        padding: 10px 15px;
        cursor: pointer;
`;
 
  
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	height: 83px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2px;
`;

export const Logo = styled(Link)`
	font-size: 35px;
	color: #3f45d1;
	font-weight: 700;
	cursor: pointer;
	text-decoration: none;
`;

export const Menu = styled.ul`
	display: flex;
`;

export const MenuItem = styled(Link)`
	margin: 10px;
	font-size: 24px;
	color: #3f45d1;
	font-weight: 500;
	cursor: pointer;
	text-decoration: none;
`;
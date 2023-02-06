import styled from "styled-components";
import { Link } from "react-router-dom";



export const Card = styled(Link)`
  	min-height: 100%;
    background: linear-gradient(0deg,rgba(0,0,0,0.7),rgba(0,0,0,0) 60%,rgba(0,0,0,0)),url(${props => props.thumbnail});
	background-size: cover;
	background-repeat: no-repeat;
    /* this means the first column wil start from one and end with column 2
    and as rows starts from one and end with row 3
    */
    grid-column-start :  ${props => props.index === 0 && 1};
    grid-column-end :  ${props => props.index === 0 && 3};
    grid-row-start :  ${props => props.index === 0 && 1};
    grid-row-end :  ${props => props.index === 0 && 3};
    border-radius : 5px;
    position : relative;
    cursor : pointer;
`;

export const CardInfo = styled.div`
    position : absolute;
    bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
    flex-direction :column;
    padding : 1rem;
    color :#fff;
    *{
        margin : 5px 0;
    }
   
`;

export const Category = styled.div`
    display: inline-block;
    border-radius : 10px;
    span {
          background-color : #3F45D1;
          padding: 5px 15px;
          border-radius : 5px;
          font-size : 14px;
    }
`;

export const Title = styled.h3`
    font-size : ${props => props.index === 0 ? "24px" : "14px"};
    font-weight : ${props => props.index === 0 ? "700" : "500"};
`;

export const PostInfoCard = styled.div`
    display : flex;
    flex-direction : column;
`;

export const InfoThumbnail = styled.img`
    width: 100%;
    height: 500px;
    border-radius : 5px;
    background-size: cover;
    /* background-size: cover; */
	background-repeat: no-repeat;
`;
export const InfoTitle = styled.h3`
    font-size : 2.2rem;
    font-weight: 700;
    padding : 25px 0;
`;
export const InfoContent = styled.p`
    font-size : 20px;
    padding : 20px 0;
    line-height : 1.9;
`;
export const PostInfoMisc = styled.div`
   display: flex;
   justify-content : space-between;
   align-items : center;
   color :#fff;
`;

export const Info = styled.div`
    display: flex;
    color : #000;
    font-size : 20px;
    font-weight: 500;
    font-style: italic;
`;

export const PostForm = styled.form`
    width :80%;
    margin : 0 auto;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size : 20px;
  `;

export const Button = styled.button`
    width: 100%;
    background-color: #3F45D1;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled{
        background-color: #736fdb;
        cursor: not-allowed;
    }
`;

export const Label = styled.label`
    font-size : 20px;
    font-weight: 600;
`;
export const Preview = styled.div`
    width: 100%;
    height: 300px;
    background: linear-gradient(0deg,rgba(0,0,0,0.7),rgba(0,0,0,0) 60%,rgba(0,0,0,0)),url(${props => props.src});
	background-size: cover;
	background-repeat: no-repeat;
`;

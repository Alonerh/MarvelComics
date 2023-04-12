import styled from "styled-components";

interface ThumbnailData {
    key: number,
    thumbnail?: {
        path: string,
        extension: string
    };
}

export const Container = styled.main`
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
`; 

export const CardList = styled.div` 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const urlImg = (props: ThumbnailData) => 
    `${props.thumbnail?.path}.${props.thumbnail?.extension}`;

export const Card = styled.div<ThumbnailData>` 
    display: inline-block;
    background-color: #222;
    height: 450px;
    width: 300px;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.3);

    h2, p {
        padding: 5px;
        text-align: center;
    }

    div#img {
        width: 100%;
        height: 400px;
        background: url(${urlImg}) no-repeat center;
        background-size: cover;
        transition: all ease 0.25s;
    }

    &:hover {
        div#img {
            height: 100px;
        }
    }

`;

export const ButtonMore = styled.div`
    background-color: #ac1d24;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    cursor: pointer;
    box-shadow: 2px 2px 10px 1px rgba(0,0,0,0.3);
    margin: 20px auto;
    padding: 0 20px;
    border-radius: 5px;
    transition: all ease 0.25s;

    svg {
        background-color: #ac1d24;
        margin: 0 8px;
        transition: all ease 0.25s;
    }

    &:hover {
        background: #ec1d24;

        svg{
            background: #ec1d24;
        }
    }

    
`;
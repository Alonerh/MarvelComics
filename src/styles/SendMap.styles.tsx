import styled from "styled-components";

export const ContainerSend = styled.div`
    height: calc(100vh - 109px);
    background-color: #000;

    .InfoSend {
        display: flex;
        text-align: center;

        .texts-container {
            background-color: #B91C1C;
        }

        h2 {
            font-weight: bold;
            font-size: 23px;
            margin: 10px 0;
        }
        p {
            overflow-y: scroll;    
            color: #000;
            background-color: gray;
            font-weight: bold;
            padding-left: 10px;
        }
        form input {
            width: 300px ;
            padding: 2px 20px;
            color: #000;
        } 
        form .submit {
            background-color: #EE171F;
            padding: 2px 20px;
            cursor: pointer;

            &:hover {
                color: rgb(185 28 28);
                background-color: rgb(226 232 240);
            }
        }
    }

    button {
        color: #000;
        background-color: purple;
    }
    button:hover {
        background-color: burlywood;
    }

    span {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: #000;
        background-color: #B91C1C;
        font-weight: bold;
        font-size: 17px;
    }

    img {
        margin-top: -30px;
    }
    .adress {
        color: #000;
        box-sizing: border-box;
        border: 1px solid transparent;
        width: 250px;
        height: 32px;
        padding: 0 12px;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        font-size: 14px;
        outline: none;
        text-overflow: ellipsis;
        position: absolute;
        left: 50%;
        margin-left: -120px;
        margin-top: 12px
    }
`;

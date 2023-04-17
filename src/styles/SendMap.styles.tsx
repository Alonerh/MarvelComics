import styled from "styled-components";

export const ContainerSend = styled.div`
    width: 100vh;
    height: 100vh;

    button {
        color: #000;
        background-color: purple;
    }
    button:hover {
        background-color: burlywood;
    }

    span {
        color: #000;
        background-color: #B91C1C;
        font-weight: bold;
        font-size: 20px;
        padding-left: 20px;
    }

    img {
        margin-top: -30px;
    }
    input {
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

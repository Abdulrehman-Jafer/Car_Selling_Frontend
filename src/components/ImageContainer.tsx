import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

type ImageContainerProps = {
  image: File;
  fileIndex: number;
  isDeleted?: boolean;
  handleDelete: (fileIndex: number) => void;
};
const ImageContainer = ({
  image,
  handleDelete,
  fileIndex,
}: ImageContainerProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);

  return (
    <Wrapper>
      <div className="container">
        <img
          src={URL.createObjectURL(image)}
          style={{
            filter: isImageVisible ? "blur(0px)" : "blur(8px)",
            transition: "all 0.3s",
          }}
          alt="Avatar"
          className={`image min-w-[150px] ${
            isDeleted ? "delete-animation" : ""
          }`}
        />
        <div className="overlay">
          <div className="overlay-container">
            <button onClick={() => setIsImageVisible((prev) => !prev)}>
              <AiOutlineEye size={24} />
            </button>
            <button
              onClick={() => {
                setIsDeleted(true);
                handleDelete(fileIndex);
              }}
            >
              <AiOutlineDelete size={24} />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ImageContainer;

const bounceOut = keyframes`
            0% {
               transform: scale(1);
            }
            25% {
               transform: scale(.95);
            }
            50% {
               opacity: 1;
               transform: scale(1.1);
            }
            100% {
               opacity: 0;
               transform: scale(.3);
            }
         
`;

const Wrapper = styled.div`
  .container {
    position: relative;
    cursor: pointer;
  }

  .image {
    display: block;
    width: 100%;
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 5px;
  }
  .delete-animation {
    animation: ${bounceOut} 1s;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: #485256;
  }

  .container:hover .overlay {
    opacity: 0.7;
  }

  .overlay-container {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    gap: 7px;
    left: 50%;
    display: flex;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

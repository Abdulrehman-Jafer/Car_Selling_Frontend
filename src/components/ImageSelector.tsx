import styled from "styled-components";

type ImageSelectorProps={
    onChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
}
const ImageSelector = ({onChange}:ImageSelectorProps) => {
  return (
    <Wrapper>
      <input key={crypto.randomUUID()} onChange={onChange} type="file"
            multiple
            accept="image/*" id="upload" hidden />
      <label htmlFor="upload">+ Add Pictures</label>
    </Wrapper>
  );
};

export default ImageSelector;

const Wrapper = styled.div`
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #72657b5c;
    color: black;
    height: 150px;
    width: 150px;
    font-family: sans-serif;
    border-radius: 5px;
    cursor: pointer;
  }
`;

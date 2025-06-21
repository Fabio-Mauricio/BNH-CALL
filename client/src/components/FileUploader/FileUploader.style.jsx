import styled from 'styled-components';

export const HiddenFileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

export const FileLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background-color: #45a049;
  }
`;

export const FileName = styled.p`
  font-style: italic;
  color: #555;
`;

export const ImagePreview = styled.img`
  max-width: 300px;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 10px #ccc;
`;
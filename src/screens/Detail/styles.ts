import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #383b42;
`;

export const Header = styled.View`
  z-index: 99;
  position: absolute;
  top: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 14px;
`;
export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: #084d6e;
  border-radius: 26px;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
  padding: 8px 14px;
  margin-top: 8px;
`;

export const Description = styled.Text`
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 30px;
  color: #ffffff;
  line-height: 20px;
`;
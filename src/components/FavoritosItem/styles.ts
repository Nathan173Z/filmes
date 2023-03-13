import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";


export const Container = styled.View`
  padding: 14px;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
`;

export const ActionContainer = styled.View`
  align-items: flex-end;
  bottom: 30px;
`;


export const DeleteButton = styled.TouchableOpacity`
  width: 15%;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather)`
font-size: 30px;
color:#ffffff;
width: 85%;
height: 30px;
justify-content: center;
align-items: center;
border-radius: 30px;

;
`

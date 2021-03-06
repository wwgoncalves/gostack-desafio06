import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background-color: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;
export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #eee;
`;
export const Name = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
`;
export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  justify-content: center;
  text-align: center;
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
`;
export const ProfileButton = styled(RectButton)`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  height: 36px;
  margin-top: 10px;
  border-radius: 4px;
  background-color: #7159c1;
`;
export const ProfileButtonText = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

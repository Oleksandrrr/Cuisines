import {TextInputProps} from 'react-native';

interface InputRowProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
}

import React, {useState} from 'react';
import {Pressable, Text, View, ViewProps} from 'react-native';
import tw from '../../tailwindcss';
import Icon from 'react-native-vector-icons/Ionicons';

export interface SelectProps extends ViewProps {
  defaultSelected: number;
  options: string[];
  onChange: (index: number) => void;
}

const Select: React.FC<SelectProps> = ({
  defaultSelected = 0,
  options,
  onChange,
  style,
  ...rest
}) => {
  const [selected, setSelected] = useState<number>(defaultSelected);

  return (
    <View style={[tw`bg-white flex border-t border-gray-300`, style]} {...rest}>
      {options.map((option, index) => (
        <Pressable
          onPress={() => {
            setSelected(index);
            onChange(index);
          }}
          key={index}
          style={({pressed}) => [
            tw`flex flex-row p-2 py-3 justify-center border-b border-gray-300`,
            pressed ? tw`bg-gray-200` : tw`bg-white`,
          ]}>
          <Text style={[tw`text-lg flex-grow pr-2`]}>{option}</Text>
          {index === selected && (
            <Icon
              name="ios-checkmark-circle"
              size={25}
              style={[tw`text-blue`]}
            />
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default Select;

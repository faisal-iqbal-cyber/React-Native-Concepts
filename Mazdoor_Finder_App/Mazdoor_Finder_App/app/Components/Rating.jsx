import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const Rating = ({ rating, onChange }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)}>
          <FontAwesome
            name={star <= rating ? 'star' : 'star-o'}
            size={25}
            color="#edb409"
            style={{ marginHorizontal: 4 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rating;

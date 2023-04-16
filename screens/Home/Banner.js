import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Rect } from 'react-native-svg';

const Banner = () => {
  return (
    <View style={{ position: 'relative', width: 322, height: 141, left: 25, top: 122 }}>
      <Svg width="100%" height="100%" viewBox="0 0 322 141">
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#f5f5f5" />
            <Stop offset="100%" stopColor="#d5d5d5" />
          </LinearGradient>
        </Defs>
        <Rect
          x="25"
          y="125"
          width="309.94"
          height="138"
          fill="url(#gradient)"
          stroke="#000"
          strokeWidth="2"
          rx="10"
          ry="10"
          filter="url(#shadow)"
        />
        <Path
          d="M244,219h74v29.5h-74v-29.5z"
          fill="rgba(81, 38, 38, 0.12)"
        />
        <Rect
          x="212"
          y="122"
          width="135"
          height="135"
          fill="#FFEDD0"
          stroke="#000"
          strokeWidth="2"
          rx="10"
          ry="10"
          filter="url(#shadow)"
        />
      </Svg>
    </View>
  );
};

export default Banner;

import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const LongText = ({text}) => {
  const maxCharLength = 100; // set the maximum number of characters to be displayed
  const maxLineCount = 6; // set the maximum number of lines to be displayed

  const truncatedText = text
    .split(' ')
    .slice(0, maxLineCount)
    .join(' ')
    .slice(0, maxCharLength);

  const displayText =
    text.length > maxCharLength || text.split('\n').length > maxLineCount
      ? truncatedText + '...'
      : text;

  return <Text style={styles.text}>{displayText}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 17,
    color: 'white',
    width: 200,
  },
});

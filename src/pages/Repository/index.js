import React from 'react';
import PropTypes from 'prop-types';

import { WebViewContainer } from './styles';

export default function Repository({ navigation }) {
  return (
    <WebViewContainer
      source={{ uri: navigation.getParam('repository').html_url }}
    />
  );
}

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

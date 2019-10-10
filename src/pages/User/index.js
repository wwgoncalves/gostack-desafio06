import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  StarsActivityIndicator,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    starsCurrentPage: 1,
    hasNextPage: false,
  };

  async componentDidMount() {
    await this.fetchStarredRepositories();
  }

  async componentDidUpdate(_, prevState) {
    const { starsCurrentPage } = this.state;
    if (prevState.starsCurrentPage !== starsCurrentPage) {
      await this.fetchStarredRepositories();
    }
  }

  fetchStarredRepositories = async () => {
    this.setState({ loading: true });

    const { navigation } = this.props;
    const { stars, starsCurrentPage } = this.state;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: starsCurrentPage,
      },
    });

    this.setState({
      stars: stars.length > 0 ? [...stars, ...response.data] : response.data,
      loading: false,
      hasNextPage: response.headers.link
        ? String(response.headers.link).indexOf('rel="next"') >= 0
        : false,
    });
  };

  handleStarsEndOfList = () => {
    const { starsCurrentPage, hasNextPage } = this.state;
    if (hasNextPage) {
      this.setState({ starsCurrentPage: starsCurrentPage + 1 });
    }
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading && <StarsActivityIndicator />}

        <Stars
          onEndReachedThreshold={2}
          onEndReached={this.handleStarsEndOfList}
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}

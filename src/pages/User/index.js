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
  CustomRefreshControl,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    starsCurrentPage: 1,
    hasNextPage: false,
    refreshing: false,
  };

  async componentDidMount() {
    await this.fetchStarredRepositories();
  }

  async componentDidUpdate(_, prevState) {
    const { starsCurrentPage, refreshing } = this.state;
    if (
      prevState.starsCurrentPage !== starsCurrentPage ||
      (prevState.refreshing === false && refreshing === true)
    ) {
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
      refreshing: false,
    });
  };

  handleEndOfStarsList = () => {
    const { starsCurrentPage, hasNextPage } = this.state;
    if (hasNextPage) {
      this.setState({ starsCurrentPage: starsCurrentPage + 1 });
    }
  };

  refreshList = () => {
    this.setState({
      stars: [],
      starsCurrentPage: 1,
      refreshing: true,
    });
  };

  handleNavigate = repository => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading && !refreshing && <StarsActivityIndicator />}

        <Stars
          refreshControl={
            <CustomRefreshControl
              onRefresh={this.refreshList}
              refreshing={refreshing}
            />
          }
          onRefresh={this.refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={2}
          onEndReached={this.handleEndOfStarsList}
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => this.handleNavigate(item)}>
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

import React from 'react';
import '../index.css';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';


const USERINFO = gql`
{
  userInfo(username:"amalsan"){
    username
    wpm
  }
}`

const Home = () => (

  <Query
    query={USERINFO}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (data) return <p>{data.userInfo.username}{data.userInfo.wpm}</p>;
    }}
  </Query>
  );

export default Home;
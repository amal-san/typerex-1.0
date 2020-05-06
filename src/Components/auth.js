import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';





const USERINFO = gql`
{
  userInfo(username:"amalsan"){
    username
    wpm
  }
}`


const USERUPDATE;


const USERDELETE; 


const USERADD;


const USERLIST;
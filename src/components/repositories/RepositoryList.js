import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import Repository from './Repository';

const GET_REPOSITORIES  = gql`
query User ($login: String!) {
  user(login: $login){
      repositories(first:100){
      totalCount
      nodes{
        url
        id
        nameWithOwner
        descriptionHTML
      }
    }
  }
}
`;


function RepositoryList({user}) {
    
    const { loading, error, data } = useQuery(GET_REPOSITORIES,{
      variables: {login:user}
    });
        
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (    
        <ul>
            {data.user.repositories.nodes.map(({ nameWithOwner, id, descriptionHTML, url }) => (
            <li key={id} style={{ paddingTop: 24, paddingBottom: 24 }}>
               <Repository nameWithOwner={nameWithOwner} descriptionHTML={descriptionHTML} url={url} ></Repository>
            </li>
            ))}
        </ul>
    );
  }

export default RepositoryList;
import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import RepositoryList from "./RepositoryList";

const GET_USER = gql`
    query {
        viewer {
        login
        }
    }
`;

function RepositoryOwner() {
    
    const { loading, error, data } = useQuery(GET_USER);
        
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);
    return (    
        <RepositoryList user={data.viewer.login} ></RepositoryList>
    );
  }

export default RepositoryOwner;
import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USER = gql`
    query {
        viewer {
        login
        }
    }
`

const GET_REPOSITORIES  = gql`
{
    search(type: REPOSITORY, query: "owner: ", first: 100) {
      nodes {
        ... on Repository {
          id
          nameWithOwner
          url
          descriptionHTML
        }
      }
    }
  }
`;


function RepositoryList() {
    
    const { loading, error, data } = useQuery(GET_REPOSITORIES);
        
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (    
        <ul
            style={{
            maxWidth: 900,
            margin: "0 auto",
            listStyle: "none",
            paddingLeft: 18,
            paddingRight: 18
            }}
        >
            {data.search.nodes.map(({ nameWithOwner, id, descriptionHTML, url }) => (
            <li key={id} style={{ paddingTop: 24, paddingBottom: 24 }}>
                <h3>
                <a href={url}>{nameWithOwner}</a>
                </h3>
                <p
                style={{ width: "75%" }}
                dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                />
            </li>
            ))}
        </ul>
    );
  }

export default RepositoryList;
import React from 'react'
import styled from 'styled-components';


export default function Welcome({currentUser}) {
  return (
    <Container>
      <h2>Welcome, <span>{currentUser.username}</span></h2>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    color: white;
    span{
      color: darkblue
    }
  }
`

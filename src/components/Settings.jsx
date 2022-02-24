import React from 'react'
import styled from 'styled-components'

const LinkCon = styled.div`
    display: flex;
    flex-direction: column;
`

function Settings() {
  return (
    <div>
        <LinkCon>
            <a href=''>Account</a>
            <a href=''>Dietary</a>
            <a href=''>Account</a>
        </LinkCon>
    </div>
  )
}

export default Settings
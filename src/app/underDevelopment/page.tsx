import React from 'react'
import { MorphingTextDemo } from './morphing'

const UnderDevelopment: React.FC = () => {
  return (
    <div style={styles.container}>
      <MorphingTextDemo/>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
}

export default UnderDevelopment

import React from 'react'
import { BackTop, Layout } from 'antd'
import styles from './App.module.css'
import SearchForm from './SearchForm/SearchForm'

const App = () => {
  return (
    <div
      className={styles.app}
    >
      <Layout>
        <Layout.Header>
          <h1>
            React Image Gallery
          </h1>
        </Layout.Header>
        <Layout.Content>
          <SearchForm />
          <BackTop />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default App

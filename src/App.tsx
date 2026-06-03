import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import AboutPage from './pages/AboutPage'
import SuggestPage from './pages/SuggestPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animal/:id" element={<AnimalDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/suggest" element={<SuggestPage />} />
      </Routes>
    </Layout>
  )
}

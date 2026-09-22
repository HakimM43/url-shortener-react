import './App.css'
import Header from './components/Header'
import ShortenerForm from './components/ShortenerForm'

function App() {
  return (
    <main>
      <Header />

      <section className="hero">
        <h1>More than just shorter links</h1>

        <p>
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>

        <button className="get-started-btn">Get Started</button>
      </section>

      <ShortenerForm />
    </main>
  )
}

export default App
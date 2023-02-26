import './App.css';
import Header from './comp/header';
import List from './comp/list';

function App() {
  return (
    <div className='app-container' >
      <Header />
      <main >
        <List />
      </main>
    </div>
  );
}

export default App;

import './App.css';
import Header from './comp/header';
import List from './comp/list';
import PathContext from './context/path.context';

function App() {
  return (
    <PathContext>
      <div className='app-container' >
        <Header />
        <main >
          <List />
        </main>
      </div>
    </PathContext>
  );
}

export default App;

import MainPage from './main-page/MainPage';
import './App.scss';
import ReloadPrompt from "../update-project-sw/ReloadPrompt.tsx";

function App() {

  return (
    <div className="App">
      <MainPage/>
      <ReloadPrompt/>
    </div>
  );
}

export default App;
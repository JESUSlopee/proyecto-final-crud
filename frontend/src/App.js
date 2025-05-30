import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemList from './pages/Items/List';
import ItemAdd from './pages/Items/Add';
import ItemEdit from './pages/Items/Edit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/items/add" element={<ItemAdd />} />
          <Route path="/items/edit/:id" element={<ItemEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
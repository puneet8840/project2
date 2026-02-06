import UserForm from "./components/UserForm";
import {HashRouter as Router,Routes,Route} from 'react-router-dom'

import UpdateForm from "./components/UpdateForm";

function App() {
  return (<>
  
<div className="container min-h-screen max-w-6xl mx-auto bg-lime-500 p-6">
 <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/users/:id" element={<UpdateForm />} />
      </Routes>
    </Router>

</div>
  
  
  </>
   
  );
}

export default App;

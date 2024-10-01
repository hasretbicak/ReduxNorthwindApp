import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi";
import {Routes , Route } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound"; 

function App() {
  return (
    <div>
      <Container>
        <Navi />
        <Routes>
          <Route path="/" exact element={<Dashboard></Dashboard>}/>
          <Route path="/product" exact element={<Dashboard></Dashboard>} />
          <Route path="/saveproduct/:productId" exact element={<AddOrUpdateProduct></AddOrUpdateProduct>} />
          <Route path="/saveproduct" exact element={<AddOrUpdateProduct></AddOrUpdateProduct>} />
          <Route path="/cart" exact element={<CartDetail></CartDetail>} />
          <Route exact path="*" element={<NotFound></NotFound>}></Route> 

        </Routes>
      </Container>
    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
// import { dataContext } from './Login';
import { useContext } from 'react';

function Home(){
    // const data=useContext(dataContext)
    return(
        
        <>
        <h>{data}</h>
           <h2> Wlcome to home page</h2>
           <Link to="/Login" className="btn btn-light" style={{color:"red",backgroundColor:"green"}} >Login</Link>
      {/* <section className="bg-light text-dark text-center p-5">
        <div className="container">
          <h1 className="display-4">Welcome to MySite</h1>
          <p className="lead">A modern responsive homepage using Bootstrap 5.</p>
          <a href="#" className="btn btn-primary btn-lg">Get Started</a>
        </div>
      </section>

    
      <section className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="card bg-dark text-light h-100">
                <div className="card-body">
                  <h3 className="card-title">Feature One</h3>
                  <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <a href="#" className="btn btn-light">Read More</a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-primary text-light h-100">
                <div className="card-body">
                  <h3 className="card-title">Feature Two</h3>
                  <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <Link to="/Login" className="btn btn-light">Read More</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-success text-light h-100">
                <div className="card-body">
                  <h3 className="card-title">Feature Three</h3>
                  <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <a href="#" className="btn btn-light">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  
      <footer className="bg-dark text-light text-center p-3">
        <p className="mb-0">&copy; 2025 MySite. All rights reserved.</p>
      </footer>  */}
        </>
    )
}
export default Home;
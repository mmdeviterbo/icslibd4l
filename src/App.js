import {Route, Switch, Redirect, useParams, useLocation } from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Footer from './components/footer';
import Homepage from './components/homepage/homepage';
import NavigationBar from './components/navigationBar';
import Notfound from './components/notfound';
import ManageResPage from './components/manageresourcespage/manageresourcespage'
import AddResourcePage from './components/addresourcepage/add-new-resource-pg'
import EditResourcePage from './components/editresourcepage/edit-res-page-form'
import AddSPThesisPage from './components/addresourcepage/add-spt-pg-container'
import ManageUser from "./components/manageuserpage/manageuserpage";
import ViewUserPage from "./components/viewuserpage/viewUserPage";
import personService from './services/personService';
import {jwtPrivateKey} from './config.json';
import {jwtEncryptionKey} from './config.json';
import * as jwtEncrypt from 'jwt-token-encrypt';
import './App.css';
import DeletePopUpCont from './components/manageresourcespage/delete-modal-container';
import ReadingSPTContainer from './components/viewresources/readingsptcontainer';
import ReadingBookContainer from './components/viewresources/readingbookcontainer';
import BrowseResources from './components/browseresources/browse-resources';
import updateResourceData from './components/crud/update';
import About from './components/about/about';


function App() {
  const [user, setUser] = useState(null); //fullname, email, userType (integer)

  const browseRef = useRef(null);
  const latestAcqRef = useRef(null);
  const newsRef = useRef(null);
  const appRef = useRef(null);

  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    getCurrentToken();
  }, []);

  // see if there's current user logged in the browser
  const getCurrentToken = () => {
    try {
      const jwt = localStorage.getItem(jwtPrivateKey);
      const encryption = {
        key: jwtEncryptionKey,
        algorithm: 'aes-256-cbc',
      };
      const decrypted = jwtEncrypt.readJWT(jwt, encryption, 'ICSlibrary');
      const userInfo = decrypted.data;
      setUser(userInfo);
    } catch (err) {}
  };

  // login/register a user
  const loginRegisterUser = async (userInfo) => {
    try {
      const {data} = await personService.loginRegisterUser(userInfo);
      localStorage.setItem(jwtPrivateKey, data); //set token
      window.location = "/home";
    } catch (err) {}
  };

  // SAMPLE DATA ONLY
  const sampleSP = {
    title: 'Adaptive Identification of Rice and Corn Pests (Order Hemiptera) using Back Propagation Neural Network Based on Intensity Histogram',
    type: 'Special Problem',
    abstract: 'Pest identification through image processing using Back Propagation Neural Network with Intensity Histogram as the feature used as basis for classification yielded an accuracy of 100% using 15 test images from each species. However, the application is only limited to pest images that have distinguishable backgrounds. The reliability of the system can be further increased by adding more training data with plain background. This research aims to help users by giving additional information about the pest identified by the system such as description, treatment, and control.',
    year: 1969,
    authorList: ['Concepcion L. Khan', 'John Viscel M. Sangkal'],
    adviserList: ['Maria Erika Dominique Cunanan', 'Katrina Joy M. Abriol-Santos'],
    keywords: ['CMSC191', 'CMSC173', 'CMSC69']  }

    const sampleBook = {
      title: 'The Little Prince',
      authorList: ['Antoine de Saint-Exupéry'],
      physicalDesc: 'Paperback : 96 pages \n ',
      year: 1943,
      publisher: 'Mariner Books; 1st edition (May 15, 2000)',
      numOfCopies: 5,
      subjects: ['moral education', 'personalism', 'dialogic approach', 'educational relationship', 'educational interaction']  }
  // CLEAR UNTIL HERE

  return (
    <div className="App" ref={appRef}>
      <NavigationBar
        loginRegisterUser={loginRegisterUser}
        browseRef={browseRef}
        user={user}
      />

        <Switch location={background || location}>
          <Route
            path="/home"
            render={() => (
              <Homepage
                browseRef={browseRef}
                appRef={appRef}
                latestAcqRef={latestAcqRef}
                newsRef={newsRef}
              />
            )}
          />
            {/* this route returns component depending on the route */}
            {/* add your new route/path here */}

            {/* <Route path="/view-user/:googleId" component={ViewUser}></Route> */}
            {/* <Route path="/account-setting/" component={ViewUser}></Route> */}
            <Route
              path="/account-setting/"
              render={() => <ViewUserPage user={user} />}></Route>
          <Route path="/home" render={()=><Homepage browseRef={browseRef} appRef={appRef} latestAcqRef={latestAcqRef} newsRef={newsRef}/>}/>
          <Route exact path="/not-found" component={Notfound}></Route>
          
           {/* add your new route/path here */}
          {/* <Route path="/view-resources" component={BrowseResources}></Route> */}
          {/* <Route path ="/view-resources" render={()=><BrowseResources type={'sp'}/>}></Route> */}
          {/* <Route path="/search" render={()=><Search appRef={appRef}/>}/> */}
          <Route path="/update-sp-thesis" component={updateResourceData}></Route>
          <Route path="/manage-resources" render={()=><BrowseResources type={'sp'}/>}></Route>
          <Route path ="/add-new-resource" component={AddResourcePage}></Route>
          <Route path ="/edit-resource" component={EditResourcePage}></Route>
          {/* <Route path ="/view-sp-thesis" render={()=><ReadingSPTContainer sampleSP={sampleSP}/>}></Route> */}
          <Route path ="/view-sp-thesis" component={ReadingSPTContainer}></Route>
          <Route path ="/view-book" render={()=><ReadingBookContainer sampleBook={sampleBook}/>}></Route>
          <Route path="/manage-users" component={ManageUser}></Route>
          <Route path="/about" render={()=><About appRef={appRef}/>}/>
          <Route exact path="/not-found" component={Notfound}></Route> 
          <Redirect exact from="/" to="/home"/>
          <Redirect to="/not-found"/>
        </Switch>
        {background && <Route path="/manage-resources/delete-sp-thesis" children={<DeletePopUpCont />} />}
      <Footer />
    </div>
  );
}

export default App;

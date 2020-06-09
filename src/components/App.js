import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Header from './HeaderComponent';
import CreateArticleComponent from './ArticleComponent/CreateComponent';
import ArticleListComponent from './ArticleComponent/ListComponent';
import ArticleEditComponent from './ArticleComponent/EditComponent';
import ArticleViewComponent from './ArticleComponent/ViewComponent';
import SignIn from './SignInComponent';
import SignUp from './SignUpComponent';
import './css/index.css';
import createBrowserHistory from '../webHistory.js';

class App extends React.Component {
    render (){
        return (
            <Router history={createBrowserHistory}>
                <Header />
                <Switch>
                    <Route path="/" exact component= {ArticleListComponent} />
                    <Route path="/articles/new/" component= {CreateArticleComponent} /> 
                    <Route path="/articles/edit/:id" component= {ArticleEditComponent} /> 
                    <Route path="/articles/:id" component= {ArticleViewComponent} />
                    <Route path="/Signin/" component= {SignIn} />
                    <Route path="/Signup/" component= {SignUp} /> 
                </Switch>
            </Router>
        )
    }
}

export default App;
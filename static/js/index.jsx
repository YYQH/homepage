(function(React, ReactDOM, ReactRouter, ReactBootstrap, Reflux, $, global) {
    var Link = ReactRouter.Link;
    var DataBase = [];
    var TypeAction = Reflux.createActions(['changeType']);
    var TypeStore = Reflux.createStore({
        listenables: [TypeAction],
        getInitialState: function() {
            console.log('typestore state');
        },
        // init: function() {
        //     console.log('typestore');
        // },
        onChangeType: function() {
            console.log('changeType');
            this.list = [234];
            this.trigger(this.list);
        }
    });
    var SearchAction = Reflux.createActions(['searchSite']);
    var SearchStore = Reflux.createStore({
        listenables: [SearchAction],
        getInitialState: function() {
            console.log('typestore state');
        },
        // init: function() {
        //     console.log('searchStore');
        // },
        onSearchSite: function() {
            console.log('searchSite');
            this.list = [123];
            this.trigger(this.list);
        }
    });
    var SiteMethod = {
        getBackgroundItemNum: function() {
            return parseInt(Math.random() * 33);
        },
        getSiteChildren: function() {
            var me = this;
            return this.state.list.map(function(obj, index) {
                var bg = {
                    background: 'url(static/img/item/item' + me.getBackgroundItemNum() + '.jpg)'
                };
                return (
                    <li key={index} style={bg}>
                        <a href={obj.site}>
                            <div className="item-inner">
                                <h1>{obj.name}</h1>
                            </div>
                            <div className="item-layer">
                                <p className="item-manager">管理者：{obj.manager}</p>
                                <p className="item-team">相关团队：{obj.team}</p>
                                <p className="item-description">{obj.description}</p>
                            </div>
                        </a>
                    </li>
                );
            });
        }
    };
    var IndexMain = React.createClass({
        mixins: [SiteMethod],
        getInitialState: function() {
            return {
                list: DataBase
            }
        },
        render: function() {
            return (
                <ul className="clearfix">
                    {this.getSiteChildren()}
                </ul>
            )
        }
    });
    var SearchMain = React.createClass({
        mixins: [Reflux.connect(SearchStore, 'list'), SiteMethod],
        getInitialState: function() {
            return {
                list: []
            }
        },
        render: function() {console.log(this.state.list);
            return (<div>Search<h3 onClick={SearchAction.searchSite}>ss{this.props.params.query}</h3></div>)
        }
    });
    var TypeMain = React.createClass({
        mixins: [Reflux.connect(TypeStore, 'list'), SiteMethod],
        getInitialState: function() {
            return {
                list: []
            }
        },
        render: function() {console.log(this.state.list);
            return (<div>success<h3 onClick={TypeAction.changeType}>tt {this.props.params.query}</h3></div>)
        }
    });
    var Header = React.createClass({
        getDefaultProps: function() {
            return {
                activeStyle: {
                    color: '#777',
                    cursor: 'no-drop'
                }
            }
        },
        goHome: function() {
            location.hash= "/"
        },
        render: function() {
            var ACTIVE = this.props.activeStyle;
            return (
                <div>
                    <header className="app-header">
                        <div className="container">
                            <p>欢迎回来！</p>
                            <img src="static/img/logo.png" onClick={this.goHome} />
                            <ul className="nav nav-pills nav-justified">
                                <li><Link to="/type/rd" activeStyle={ACTIVE}>RD</Link></li>
                                <li><Link to="/type/fe" activeStyle={ACTIVE}>FE</Link></li>
                                <li><Link to="/type/app" activeStyle={ACTIVE}>APP</Link></li>
                                <li><Link to="/type/pm" activeStyle={ACTIVE}>PM</Link></li>
                                <li><Link to="/type/yy" activeStyle={ACTIVE}>YY</Link></li>
                                <li><Link to="/type/qa" activeStyle={ACTIVE}>QA</Link></li>
                            </ul>
                        </div>
                    </header>
                    <div className="app-banner">
                    </div>
                </div>
            );
        }
    });
    var App = React.createClass({
        render: function() {
            return (
                <div>
                    <Header />
                    <div className="app-main container">
                        {this.props.children}
                    </div>
                    <div style={{textAlign:'center',margin:'20px 0 10px'}}>©2014 Baidu&emsp;version: 1.0.0&emsp;Made By <a href="http://wiki.baidu.com/display/IMAGEFE/image-fe">IMAGE FE</a></div>
                </div>
            );
        }
    });
    var routes = (
        <ReactRouter.Router>
            <ReactRouter.Route path="/" component={App}>
                <ReactRouter.IndexRoute component={IndexMain} />
                <ReactRouter.Route name="Search" path="search/:query" component={SearchMain} />
                <ReactRouter.Route name="Type" path="type/:query" component={TypeMain} />
            </ReactRouter.Route>
        </ReactRouter.Router>
    );

    (function() {
        $.get('/data/sites.json')
        .success(function(res) {
            if (res.errno === 0 && res.data) {
                DataBase = res.data;
                ReactDOM.render(routes, document.getElementById('app'));
            }
        })
    })();
})(window.React, window.ReactDOM, window.ReactRouter, window.ReactBootstrap, window.Reflux, window.jQuery, window);
module.exports = function(app, views_router, config){
	console.log('->*<- [START] Load Views ->*<-');

	require('./login/loginRender')(app, views_router, config);
	console.log('3. loginRender is loaded');

	require('./main/mainRender')(app, views_router, config);
	console.log('1. mainRender is loaded');
};

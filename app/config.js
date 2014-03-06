module.exports = {
	db: {
		host     : 'localhost',
		user     : 'dn9x',
		password : '123',
		database : 'awebkit',
		waitForConnections : true,	//如果连线超过了最大连线数就加入等待队列，false就返回一个错误
		connectionLimit : 40,		//连接的最大数40，默认是10
		queueLimit : 0,				//最大队列限制，如果超过最大连接数，就加入到队列，0表示队列无限制，默认0
	},
};
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/mongo'; // const url = 'mongodb://admin:123456@localhost:27017/'; 有密码连接方式 
const dbName = 'itying';
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("连接成功");
    //获取 db 对象 
    const db = client.db(dbName);
});
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn' },
        { name: 'Google', url: 'https://www.google.com', type: 'en' },
        { name: 'Facebook', url: 'https://www.google.com', type: 'en' }
    ];
    dbo.collection("site").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});
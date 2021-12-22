const { express, db } = require('./app');
const router = express.Router();

router.post('/login', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const userInfo = JSON.parse(data).userInfo;
    const { username, password } = userInfo;
    db.query(
      `SELECT username, password from users where username='${username}'`,
      (err, results) => {
        if (err) throw err;
        if (results.length) {
          if (results[0].password === password) {
            res.send({
              status: 0,
              text: '登陆成功',
            });
          } else {
            res.send({
              status: 1,
              text: '密码错误',
            });
          }
        } else {
          res.send({
            status: 1,
            text: '用户不存在',
          });
        }
      }
    );
  });
});

router.post('/register', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const userInfo = JSON.parse(data).userInfo;
    const { username, password } = userInfo;
    db.query(
      `SELECT username from users where username='${username}'`,
      (err, results) => {
        if (err) throw err;
        if (results.length) {
          res.send({
            status: 1,
            text: '用户名已存在',
          });
        } else {
          db.query(
            `INSERT users(username,password) values('${username}', '${password}')`,
            (err, results) => {
              if (err) throw err;
              res.send({
                status: 0,
                text: '注册成功',
              });
            }
          );
        }
      }
    );
  });
});

router.post('/register/checkUsername', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const username = JSON.parse(data).username;
    db.query(
      `SELECT username from users where username='${username}'`,
      (err, results) => {
        if (err) throw err;
        if (results.length) {
          res.send({
            status: 1,
            text: '用户名重复',
          });
        } else {
          res.send({
            status: 0,
            text: '用户名可用',
          });
        }
      }
    );
  });
});

module.exports = router;

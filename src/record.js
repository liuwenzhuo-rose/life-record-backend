const { express, db } = require('./app');
const router = express.Router();

// 获取记录列表
router.get('/getRecords', (req, res) => {
  db.query(
    'SELECT id, date, content from records order by id desc',
    function (err, results) {
      if (err) {
        res.send({
          status: 1,
          text: '服务器出错啦～',
        });
      } else {
        res.send({
          status: 0,
          records: results,
        });
      }
    }
  );
});

// 删除记录
router.delete('/deleteRecord/:id', (req, res) => {
  const id = req.params.id;
  db.query(`DELETE from records where id=${id}`, function (err, results) {
    if (err) {
      res.send({
        status: 1,
        text: '服务器出错啦～',
      });
    } else {
      res.send({
        status: 0,
      });
    }
  });
});

// 更新记录
router.put('/updateRecord/:id', (req, res) => {
  const id = req.params.id;
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const record = JSON.parse(data).record;
    db.query(
      `UPDATE records SET content='${record.content}' where id=${id}`,
      (err, results) => {
        if (err) {
          res.send({
            status: 1,
            text: '服务器出错啦～',
          });
        } else {
          res.send({
            status: 0,
          });
        }
      }
    );
  });
});

// 新增记录
router.post('/createRecord', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const record = JSON.parse(data).record;
    db.query(
      `INSERT records(date, content) values('${new Date().toLocaleString()}','${
        record.content
      }')`,
      (err, results) => {
        if (err) {
          res.send({
            status: 1,
            text: '服务器出错啦～',
          });
        } else {
          res.send({
            status: 0,
          });
        }
      }
    );
  });
});

module.exports = router;

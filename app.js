const express = require('express');
const db = require('./mysql');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('환영! 윤지현현');
});

app.get('/db', (req, res) => {
  db.query('SELECT * FROM user_table', (err, results) => {
    if (err) {
      console.error('조회 오류:', err);
      return res.status(500).send('DB 조회 실패');
    }
    res.json(results);
  });
});

app.post('/db', (req, res) => {
  const { User_id, User_pw, User_name } = req.body;

  if (!User_id || !User_pw || !User_name) {
    return res.status(400).send('User_id, User_pw, User_name를 입력하세요');
  }

  const sql = 'INSERT INTO user_table (User_id, User_pw, User_name) VALUES (?, ?, ?)';
  db.query(sql, [User_id, User_pw, User_name], (err, result) => {
    if (err) {
      console.error('저장 오류:', err);
      return res.status(500).json({ msg: '저장 실패' });
    }
    res.json({ msg: '정보 저장 성공',
        insertId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`서버 실행: http://localhost:${port}`);
});
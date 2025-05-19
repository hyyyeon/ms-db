const express = require('express');
const db = require('./mysql');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('환영! 윤지현현');
});

app.get('/db', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('조회 오류:', err);
      return res.status(500).send('DB 조회 실패');
    }
    res.json(results);
  });
});

app.post('/db', (req, res) => {
  const { UserID, UserPW, UserName } = req.body;

  if (!UserID || !UserPW || !UserName) {
    return res.status(400).send('UserID, UserPW, UserName 모두 입력해주세요');
  }

  const sql = 'INSERT INTO user (UserID, UserPW, UserName) VALUES (?, ?, ?)';
  db.query(sql, [UserID, UserPW, UserName], (err, result) => {
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
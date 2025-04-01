const checkEmail = async (email, db) => {
  const [rows, fields] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  
  if (!rows?.length) return null;
  return rows[0];
}

module.exports = { checkEmail };